import { Injectable } from '@angular/core';
import { Unit,Apiresponse } from 'src/app/ratelist-models';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UnitsService {
  constructor(
    private http: HttpClient
  ) { }
  getUnits(): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/units/getall`)
  }
  getUnitById(id: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/units/getbyid/${id}`)
  }
  updateUnit(unit: Unit): Observable<Apiresponse> {
    return this.http.put<Apiresponse>(`${environment.apiUrl}/units/update`, unit)
  }
  addUnit(unit: Unit): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(`${environment.apiUrl}/units/add`, unit)
  }
  deleteUnit(id: number): Observable<Apiresponse> {
    return this.http.delete<Apiresponse>(`${environment.apiUrl}/units/delete/${id}`)
  }

}
