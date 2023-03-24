import { Injectable } from '@angular/core';
import { Mandicommoditypricing } from 'src/app/models/mandicommoditypricing';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Apiresponse } from 'src/app/ratelist-models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MandicommoditypricingService {

  constructor(
    private http: HttpClient
  
  ) { }

  getallMandicommoditypricing(): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/mandicommoditypricing/getall`);
  }
  saveMandiCommodityPricing(mandicommoditypricing: Mandicommoditypricing): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(`${environment.apiUrl}/mandicommoditypricing/add`, mandicommoditypricing);
  }
  deleteMandiCommodityPricing(id: number): Observable<Apiresponse> {
    return this.http.delete<Apiresponse>(`${environment.apiUrl}/mandicommoditypricing/delete/${id}`);
  }
  getMandiCommodityPricingById(id: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/mandicommoditypricing/getbyid/${id}`);
  }
  updateMandiCommodityPricing(mandicommoditypricing: Mandicommoditypricing): Observable<Apiresponse> {
    return this.http.put<Apiresponse>(`${environment.apiUrl}/mandicommoditypricing/update`, mandicommoditypricing);
  }


}
