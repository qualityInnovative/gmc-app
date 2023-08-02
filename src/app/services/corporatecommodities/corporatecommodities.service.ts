import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CorporationCommodity } from 'src/app/models/corporationcommodity';
import { environment } from 'src/environments/environment';
import { Apiresponse } from 'src/app/ratelist-models';
@Injectable({
  providedIn: 'root'
})
export class CorporatecommoditiesService {
  constructor(
    private http: HttpClient
  ) { }
  getcorporatecommodities(): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/corporationcommodity/getall`);
  }
  getCoporateCommodity(id: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/corporationcommodity/getbyid/${id}`);
  }
  saveCoporateCommodity(corporationcommodity: CorporationCommodity): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(`${environment.apiUrl}/corporationcommodity/add`, corporationcommodity);
  }
  updateCoporateCommodity(corporationcommodity: CorporationCommodity): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(`${environment.apiUrl}/corporationcommodity/update`, corporationcommodity);
  }
  deleteCoporateCommodity(corporationcommodity: CorporationCommodity): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(`${environment.apiUrl}/corporationcommodity/delete`, corporationcommodity);
  }
   getcorporatecommoditiesbycorporateid(corporateid:number): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(`${environment.apiUrl}/corporationcommodity/getallbycorporateid`,{corporationId:corporateid});
   }
   getallcorporatecommoditiesbycorporateidwithoutimages(corporateid:number): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(`${environment.apiUrl}/corporationcommodity/getallcorporatecommoditiesbycorporateidwithoutimages`,{corporationId:corporateid});
   }
}
