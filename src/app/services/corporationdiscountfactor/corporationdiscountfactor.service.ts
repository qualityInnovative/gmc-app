import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Corporatepricefactor } from '../../models/corporationdiscountfactor';
import { Observable } from 'rxjs';
import { Apiresponse } from 'src/app/ratelist-models';

@Injectable({
  providedIn: 'root'
})
export class CorporationdiscountfactorService {

  constructor(
    public http: HttpClient
  ) { }
 
  getallcorporatepricefactor(): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/corporationdiscountfactor/getall`);
  }
  getcorporatepricefactor(id: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/corporationdiscountfactor/getbyid/${id}`);
  }
  updatecorporatepricefactor(corporatepricefactor: Corporatepricefactor): Observable<Apiresponse> {
    return this.http.put<Apiresponse>(`${environment.apiUrl}/corporationdiscountfactor/update`, corporatepricefactor);
  }
  addcorporatepricefactor(corporatepricefactor: Corporatepricefactor): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(`${environment.apiUrl}/corporationdiscountfactor/insert`, corporatepricefactor);
  }
  getcorporatepricefactorsByuserandcoporation(corporationId: number, userId: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/corporationdiscountfactor/getcorporatepricefactorsByuserandcoporation/${corporationId}/${userId}`);
  }
  updatecorporatepricefactoradmin(corporatepricefactor: Corporatepricefactor): Observable<Apiresponse> {
    return this.http.put<Apiresponse>(`${environment.apiUrl}/corporationdiscountfactor/updateadmin`, corporatepricefactor);
  }

}
