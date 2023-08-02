import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CorporateDiscount } from 'src/app/ratelist-models';
import { environment } from 'src/environments/environment';
import { Apiresponse } from 'src/app/ratelist-models';
@Injectable({
  providedIn: 'root'
})
export class CorporatediscountService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getcorporatediscountsbycorporateid(id:number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${this.baseUrl}/corporationcommoditydiscount/getallbycorporationcommodityid/${id}`);
  }
  savecorporatediscount(corporateDiscount: CorporateDiscount): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(`${this.baseUrl}/corporationcommoditydiscount/save`, corporateDiscount);
  }
  updatecorporatediscount(corporateDiscount: CorporateDiscount): Observable<Apiresponse> {
    return this.http.put<Apiresponse>(`${this.baseUrl}/corporationcommoditydiscount/update`, corporateDiscount);
  }
  deletecorporatediscount(id: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${this.baseUrl}/corporationcommoditydiscount/delete/${id}`);
  }
  getcorporatediscountbyid(id: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${this.baseUrl}/corporationcommoditydiscount/getbyid/${id}`);
  }
}
