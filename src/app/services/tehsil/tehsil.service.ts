import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tehsil,Apiresponse } from 'src/app/ratelist-models';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TehsilService {
  constructor(
    private http:HttpClient
  ) { }
  admincreatetehsil(tehsil:Tehsil):Observable<Apiresponse>{
    return this.http.post<Apiresponse>(`${environment.apiUrl}/tehsils/create`,tehsil);
  }
  admingettehsil(tehsilId:number):Observable<Apiresponse>{
    return this.http.get<Apiresponse>(`${environment.apiUrl}/tehsils/getbyid/${tehsilId}`);
  }
  admingettehsilsfordistrict(districtId:number):Observable<Apiresponse>{
    return this.http.get<Apiresponse>(`${environment.apiUrl}/tehsils/getbydistrictid/${districtId}`);
  }
  admindeletetehsil(tehsilId:number):Observable<Apiresponse>{
    return this.http.delete<Apiresponse>(`${environment.apiUrl}/tehsils/delete/${tehsilId}`);
  }
  adminupdatetehsil(tehsil:Tehsil):Observable<Apiresponse>{
    return this.http.put<Apiresponse>(`${environment.apiUrl}/tehsils/update/`+tehsil.id,tehsil);
  }
  admingetalltehsils():Observable<Apiresponse>{
    return this.http.get<Apiresponse>(`${environment.apiUrl}/thesils/getall`);
  }
}
