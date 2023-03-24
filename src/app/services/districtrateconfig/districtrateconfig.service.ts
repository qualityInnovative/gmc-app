import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apiresponse } from 'src/app/ratelist-models';
import { DistrictRateConfiguration } from 'src/app/models/districtrateconfiguration';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DistrictrateconfigService {

  constructor(
    private http: HttpClient
  ) { }
  getallDistrictconfig(): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/districtrateconfig/getall`);
  }
  getDistrictconfigById(id: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/districtrateconfig/getDistrictconfigById/${id}`);
  }
  updateDistrictconfig(districtRateConfiguration: DistrictRateConfiguration): Observable<Apiresponse> {
    return this.http.put<Apiresponse>(`${environment.apiUrl}/districtrateconfig/update`
      + '/' +
      districtRateConfiguration.id, districtRateConfiguration);
  }
  addDistrictconfig(districtRateConfiguration: DistrictRateConfiguration): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(`${environment.apiUrl}/districtrateconfig/add`, districtRateConfiguration);
  }
  deleteDistrictconfig(id: number): Observable<Apiresponse> {
    return this.http.delete<Apiresponse>(`${environment.apiUrl}/districtrateconfig/delete/${id}`);
  }
}
