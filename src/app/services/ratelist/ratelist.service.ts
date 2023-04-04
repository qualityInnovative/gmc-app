import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RateList } from '../../models/ratelist';
import { environment } from '../../../environments/environment';
import { Apiresponse } from 'src/app/ratelist-models';
@Injectable({
  providedIn: 'root'
})
export class RatelistService {
  constructor(
    private http: HttpClient
  ) { }
  addRateListfromMain(rateList: any): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(`${environment.apiUrl}/ratelist/addratelistfromMain`, rateList);
  }
  getRateListByCategory(categoryId: number, stateId: number, districtId: number): Observable<Apiresponse> {
    let body = {
      categoryId: categoryId,
      stateId: stateId,
      districtId: districtId
    }
    return this.http.post<Apiresponse>(`${environment.apiUrl}/ratelist/getratelistbycategory`, body);
  }
  getRateOfCommodityinUserMandi(commodityId: number, mandiId: number): Observable<Apiresponse> {
    let data = {
      commodityId: commodityId,
      mandiId: mandiId,
    }
    return this.http.post<Apiresponse>(`${environment.apiUrl}/retailrate/getrateofcommodityinusermandi`, data);
  }
  //  .getdistrictRateConfig(commodityId,mandiId,districtId)
  getdistrictRateConfig(commodityId: number, mandiId: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/retailratelist/getdistrictrateconfig/${commodityId}/${mandiId}/`);
  }
  getRateListByCategoryUser(categoryId:number, createdBy: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/retailratelist/getratelistbycategoryuser/${categoryId}/${createdBy}`);
  }
 

}
