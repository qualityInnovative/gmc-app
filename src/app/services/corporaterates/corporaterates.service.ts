import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apiresponse } from 'src/app/ratelist-models';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CorporateratesService {
  private baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
    ) { }
  getcorporateratesbycorporateId(id: number): Observable<Apiresponse> {
    return  this.http.get<Apiresponse>(`${this.baseUrl}/corporaterates/getbycorporate/${id}`);
  }
  getcorporateratebyid(id: number): Observable<Apiresponse> {
    return  this.http.get<Apiresponse>(`${this.baseUrl}/corporaterates/getbycorporatecommodity/${id}`);
  }
}
