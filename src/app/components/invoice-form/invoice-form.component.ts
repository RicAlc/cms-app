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
  selector: 'app-invoice-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './invoice-form.component.html',
  styleUrl: './invoice-form.component.css',
})
export class InvoiceFormComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  swal: any = Swal;
  invoiceId: number = 0;
  clients: any[] = []; // Lista de clientes
  invoiceForm: FormGroup;

  constructor(
    private router: Router,
    private dataService: DataService,
    private fb: FormBuilder
  ) {
    this.invoiceForm = this.initializeForm();
    this.invoiceId = Number(this.route.snapshot.params['id']);
  }

  ngOnInit() {
    this.fetchClientes();
    if (this.invoiceId > 0) {
      this.dataService.getFactura(this.invoiceId).subscribe({
        next: (resp: any) => {
          this.invoiceForm.patchValue(resp);
          if (resp.fecha_facturacion) {
            const formattedDate = new Date(resp.fecha_facturacion);
            this.invoiceForm
              .get('fecha_facturacion')
              ?.setValue(formattedDate.toISOString().split('T')[0]);
          }
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
      id_usuario: [0, [Validators.required, Validators.min(1)]],
      folio: [''],
      saldo: ['', [Validators.required, Validators.min(1)]],
      fecha_facturacion: ['', [Validators.required]],
      fecha_creacion: [''],
    });
  }
  handleSubmit() {
    this.invoiceForm.value.fecha_creacion = new Date()
      .toISOString()
      .split('T')[0];
    if (!this.invoiceForm.valid) {
      this.swal.fire(SwalConfig.incompleteForm);
      return;
    }
    this.dataService.postFactura(this.invoiceForm.value).subscribe({
      next: (resp: any) => {
        this.router.navigate(['/facturas']);
        this.swal.fire(SwalConfig.success);
      },
      error: (err: any) => {
        console.error(err);
        this.swal.fire(SwalConfig.error);
      },
    });
  }
  goBack() {
    this.router.navigate(['/facturas']);
  }
  fetchClientes() {
    this.dataService.getAllClientes().subscribe({
      next: (resp: any) => {
        this.clients = resp;
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
