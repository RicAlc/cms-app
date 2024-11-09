import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import Swal from 'sweetalert2';
import { SwalConfig } from '../../shared/sweetalert.config';

@Component({
  selector: 'app-clients-table',
  standalone: true,
  imports: [],
  templateUrl: './clients-table.component.html',
  styleUrl: './clients-table.component.css',
})
export class ClientsTableComponent implements OnInit {
  swal: any = Swal;
  clients: any[] = [];
  titles = [
    { id: 1, name: 'Nombre' },
    { id: 2, name: 'Apellido' },
    { id: 3, name: 'Correo electrónico' },
    { id: 4, name: 'Acciones' },
  ];

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.fetchClientes();
  }

  handleDelete(id: number) {
    this.swal.fire(SwalConfig.deleteConfirmation).then((result: any) => {
      if (result.value) {
        this.dataService.deleteCliente(id).subscribe({
          next: (resp: any) => {
            this.swal.fire(SwalConfig.success);
            this.fetchClientes();
          },
          error: (err: any) => {
            console.error(err);
            this.swal.fire(SwalConfig.error);
          },
        });
      }
    });
  }
  handleEdit(id: number) {
    this.router.navigate(['/clientes', id]);
  }
  handleAdd() {
    this.router.navigate(['/clientes', 0]);
  }
  fetchClientes() {
    this.dataService.getAllClientes().subscribe((resp: any) => {
      this.clients = resp;
    });
  }
}
