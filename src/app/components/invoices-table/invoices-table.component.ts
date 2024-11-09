import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import Swal from 'sweetalert2';
import { SwalConfig } from '../../shared/sweetalert.config';

interface Invoice {
  id: number;
  folio: string;
  cliente_nombre: string;
  saldo: number;
  fecha_facturacion: Date;
  fecha_creacion: Date;
}
@Component({
  selector: 'app-invoices-table',
  standalone: true,
  imports: [],
  templateUrl: './invoices-table.component.html',
  styleUrls: ['./invoices-table.component.css'],
})
export class InvoicesTableComponent implements OnInit {
  swal: any = Swal;
  invoiceId: number = 0;
  invoices: Invoice[] = [];
  titles = [
    { id: 1, name: 'Folio' },
    { id: 2, name: 'Cliente' },
    { id: 3, name: 'Saldo' },
    { id: 4, name: 'Fecha de facturación' },
    { id: 5, name: 'Fecha de creación' },
    { id: 6, name: 'Acciones' },
  ];

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.fetchInvoices();
  }

  handleAdd() {
    this.router.navigate(['/facturas', 0]);
  }
  handleDelete(id: number) {
    this.dataService.deleteFactura(id).subscribe({
      next: (resp: any) => {
        this.swal.fire(SwalConfig.success);
        this.fetchInvoices();
      },
      error: (err: any) => {
        this.swal.fire(SwalConfig.error);
      },
    });
  }
  handleEdit(id: number) {
    this.router.navigate(['/facturas', id]);
  }
  fetchInvoices() {
    this.dataService.getAllFacturas().subscribe({
      next: (resp: any) => {
        this.invoices = resp;
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
