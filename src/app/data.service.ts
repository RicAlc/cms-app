import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // Desarrollo local
  private baseApiUrl = 'https://localhost:44368/api/';

  constructor(private http: HttpClient) {}

  // Clientes
  getCliente(id: number): Observable<any> {
    return this.http.get(this.baseApiUrl + 'Clientes/' + id);
  }
  getAllClientes(): Observable<any> {
    return this.http.get(this.baseApiUrl + 'Clientes');
  }
  postCliente(cliente: any): Observable<any> {
    return this.http.post(this.baseApiUrl + 'Clientes', cliente);
  }
  updateCliente(cliente: any): Observable<any> {
    return this.http.put(this.baseApiUrl + 'Clientes/' + cliente.id, cliente);
  }
  deleteCliente(id: number): Observable<any> {
    return this.http.delete(this.baseApiUrl + 'Clientes/' + id);
  }

  // Facturas
  getFactura(id: number): Observable<any> {
    return this.http.get(this.baseApiUrl + 'Facturas/' + id);
  }
  getAllFacturas(): Observable<any> {
    return this.http.get(this.baseApiUrl + 'Facturas');
  }
  postFactura(factura: any): Observable<any> {
    return this.http.post(this.baseApiUrl + 'Facturas', factura);
  }
  updateFactura(factura: any): Observable<any> {
    return this.http.put(this.baseApiUrl + 'Facturas/' + factura.id, factura);
  }
  deleteFactura(id: number): Observable<any> {
    return this.http.delete(this.baseApiUrl + 'Facturas/' + id);
  }
}
