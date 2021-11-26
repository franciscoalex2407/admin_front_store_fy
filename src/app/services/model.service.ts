import { Injectable } from "@angular/core";
import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  url = environment.url;

  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend
  ) {

  }

  getEmpresas(queryParams: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/admin/business`, { params: queryParams });
  }
  getEmpresa(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/admin/business/${id}`);
  }
  createEmpresa(data: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.url}/admin/business`, data);
  }
  updateEmpresa(data: any, id: number): Observable<any[]> {
    return this.http.put<any[]>(`${this.url}/admin/business/${id}`, data);
  }
  deleteEmpresa(id: number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.url}/admin/business/${id}`);
  }

  //consulta cnpj: https://www.receitaws.com.br/v1/cnpj/12750852000185
  getAdress(cep: number) {
    const http = new HttpClient(this.httpBackend);
    return http.get(`https://viacep.com.br/ws/${cep}/json`);
  }

  //Usuários
  getUsers(queryParams: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/admin/user`, { params: queryParams });
  }
  getUser(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/admin/user/${id}`);
  }
  createUser(data: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.url}/admin/user`, data);
  }
  updateUser(data: any, id: number): Observable<any[]> {
    return this.http.put<any[]>(`${this.url}/admin/user/${id}`, data);
  }
  deleteUser(id: number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.url}/admin/user/${id}`);
  }

}
