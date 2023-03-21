import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { District, Apiresponse } from '../../ratelist-models';
@Injectable({
  providedIn: 'root'
})
export class DistrictsService {

  constructor(
    private http: HttpClient
  ) { }
  admingetDistricts(): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/districts/getall`)
  }
  admingetDistrictById(id: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/districts/get/${id}`)
  }
  admingetDistrictsByStateId(id: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/districts/getbystate/${id}`)
  }
  adminupdateDistrict(district: District): Observable<Apiresponse> {
    return this.http.put<Apiresponse>(`${environment.apiUrl}/districts/update/`+district.id, district)
  }
  adminaddDistrict(district: District): Observable<Apiresponse> {
    console.log(district);
    return this.http.post<Apiresponse>(`${environment.apiUrl}/districts/add`, district)
  }
  adminDeleteDistrict(id: number): Observable<Apiresponse> {
    return this.http.delete<Apiresponse>(`${environment.apiUrl}/districts/delete/`+id)
  }



}
