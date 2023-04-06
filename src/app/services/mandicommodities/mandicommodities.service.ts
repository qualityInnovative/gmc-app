import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MandiCommodity } from 'src/app/ratelist-models';
@Injectable({
  providedIn: 'root'
})
export class MandicommoditiesService {
  constructor(
    private http: HttpClient
  ) { }
  getCommmoditiesForMandi(mandiId:number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/mandicommodities/getcommmoditiesformandi/'+mandiId);
  }
  checkMandiCommodity(mandiCommodity: MandiCommodity): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/mandicommodities/checkmandicommodity', mandiCommodity);
  }
  addMandiCommodity(mandiCommodity: MandiCommodity): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/mandicommodities/addmandicommodity', mandiCommodity);
  }
  deleteCommodityFromMandi(mandiCommodityId: number): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + '/mandicommodities/deletecommodityfrommandi/' + mandiCommodityId);
  }
}
