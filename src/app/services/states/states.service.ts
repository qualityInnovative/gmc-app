import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { State, Apiresponse } from '../../ratelist-models';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  constructor(
    private http: HttpClient
  ) { }
  admingetStates(): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/states/getall`)
  }
  admingetStateById(id: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/states/get/${id}`)
  }
  adminUpdateState(state: State): Observable<Apiresponse> {
    return this.http.put<Apiresponse>(`${environment.apiUrl}/states/update/${state.id}`, state)
  }
  adminAddState(state: State): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(`${environment.apiUrl}/states/create`, state)
  }
  admindeleteState(id: number): Observable<Apiresponse> {
    return this.http.delete<Apiresponse>(`${environment.apiUrl}/states/delete/${id}`)
  }
  getDistrictsofstate(stateId: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/states/getdistrcitsofstate/${stateId}`)
  }

}
