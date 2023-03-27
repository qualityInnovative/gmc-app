import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RetailRateList } from 'src/app/models/retailRateList'
import { Apiresponse } from 'src/app/ratelist-models';
@Injectable({
  providedIn: 'root'
})
export class RetailratelistService {
  constructor(
    private http: HttpClient
  ) { }
  getRetailRateList(): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/retailratelist/getall`);
  }
  getRetailRateListById(id: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/retailratelist/get/${id}`);
  }
  saveRetailRateList(retailratelist: RetailRateList): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(`${environment.apiUrl}/retailratelist/create`, retailratelist);
  }
}
