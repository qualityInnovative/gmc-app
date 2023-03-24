import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commodity } from 'src/app/models/commodity';
import { Apiresponse } from 'src/app/ratelist-models';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CommoditiesService {
  constructor(
    private http: HttpClient
  ) { }
  getCommodities(page: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/commodities/commodities/${page}`);
  }
  getCommodityById(id: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/commodities/commoditybyid/${id}`);
  }
  updateCommodity(commodity: Commodity): Observable<Apiresponse> {
    return this.http.put<Apiresponse>(`${environment.apiUrl}/commodities/update`
      + '/' +
      commodity.id, commodity);
  }
  addCommodity(commodity: Commodity): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(`${environment.apiUrl}/commodities/add`, commodity);
  }
  getCommoditiesByCategory(categoryId: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/commodities/commoditiesbycategory/${categoryId}`);
  }
  deleteCommodity(id: number): Observable<Apiresponse> {
    return this.http.delete<Apiresponse>(`${environment.apiUrl}/commodities/delete/${id}`);
  }
  getAllCommodities(): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/commodities/getall`);
  }

}
