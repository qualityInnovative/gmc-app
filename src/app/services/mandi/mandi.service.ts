import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mandi } from 'src/app/ratelist-models';
import { environment } from 'src/environments/environment';
import { Apiresponse } from 'src/app/ratelist-models';
@Injectable({
  providedIn: 'root'
})
export class MandiService {
  constructor(
    private http: HttpClient
  ) { }
  getallMandis(): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/mandi/get`)
  }
  getAlldepartments(): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.acogsApiUrl}/department/getall`)
  }
  adminAddMandi(mandi: Mandi): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(`${environment.apiUrl}/mandi/add`, mandi);
  }
  adminGetMandiById(mandiId: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/mandi/getbyid/${mandiId}`);
  }
  adminUpdateMandi(mandi: Mandi): Observable<Apiresponse> {
    return this.http.put<Apiresponse>(`${environment.apiUrl}/mandi/update`, mandi);
  }
  adminDeleteMandi(mandiId: number): Observable<Apiresponse> {
    return this.http.delete<Apiresponse>(`${environment.apiUrl}/mandi/delete/${mandiId}`);
  }
}
