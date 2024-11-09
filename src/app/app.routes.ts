import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { InvoicesTableComponent } from './components/invoices-table/invoices-table.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { NotFoundComponent } from './components/notfound/notfound.component';

export const routes: Routes = [
  {
    path: '',
    component: HeroComponent,
    title: 'Inicio',
  },
  {
    path: 'clientes',
    title: 'Clientes',
    children: [
      {
        path: '',
        component: ClientsTableComponent,
      },
      {
        path: ':id',
        component: ClientFormComponent,
      },
    ],
  },
  {
    path: 'facturas',
    title: 'Facturas',
    children: [
      {
        path: '',
        component: InvoicesTableComponent,
      },
      {
        path: ':id',
        component: InvoiceFormComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
