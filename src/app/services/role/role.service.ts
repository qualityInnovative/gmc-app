import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Apiresponse } from 'src/app/ratelist-models';
import { Observable } from 'rxjs';
import { Role } from 'src/app/ratelist-models';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }
  getAllRoles(): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${this.apiUrl}/roles/getall`);
  }
  getRole(id: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${this.apiUrl}/roles/get/${id}`);
  }
  addRole(role: Role): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(`${this.apiUrl}/roles/save`, role);
  }
}
