import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../data.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { SwalConfig } from '../../shared/sweetalert.config';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css',
})
export class ClientFormComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  swal: any = Swal;
  clientId: number = 0;
  clientForm: FormGroup;

  constructor(
    private router: Router,
    private dataService: DataService,
    private fb: FormBuilder
  ) {
    this.clientId = Number(this.route.snapshot.params['id']);
    this.clientForm = this.initializeForm();
  }

  ngOnInit() {
    if (this.clientId > 0) {
      this.dataService.getCliente(this.clientId).subscribe({
        next: (resp: any) => {
          this.clientForm.patchValue(resp);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
  private initializeForm(): FormGroup {
    return this.fb.group({
      id: [0],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      edad: ['', [Validators.required, Validators.min(18)]],
      correo_electronico: ['', [Validators.required, Validators.email]],
      tipo_usuario: ['cliente'],
    });
  }
  handleSubmit() {
    if (!this.clientForm.valid) {
      this.swal.fire(SwalConfig.incompleteForm);
      return;
    }
    if (this.clientForm.value.id > 0) {
      this.dataService.updateCliente(this.clientForm.value).subscribe({
        next: (resp: any) => {
          this.router.navigate(['/clientes/']);
          this.swal.fire(SwalConfig.success);
        },
        error: (err: any) => {
          console.error(err);
          this.swal.fire(SwalConfig.error);
        },
      });
    } else {
      this.dataService.postCliente(this.clientForm.value).subscribe({
        next: (resp: any) => {
          this.router.navigate(['/clientes']);
          this.swal.fire(SwalConfig.success);
        },
        error: (err: any) => {
          console.error(err);
          this.swal.fire(SwalConfig.error);
        },
      });
    }
  }
  goBack() {
    this.router.navigate(['/clientes']);
  }
}
