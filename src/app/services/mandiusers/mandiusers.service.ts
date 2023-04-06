import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/ratelist-models';
import { environment } from 'src/environments/environment';
import { Apiresponse } from 'src/app/ratelist-models';
@Injectable({
  providedIn: 'root'
})
export class MandiusersService {
  constructor(
    private http: HttpClient
  ) { }
  getUsersProfileforMandi(mandiId: number): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(environment.apiUrl + '/mandiusers/getUsersProfileforMandi/' + mandiId);
  }
  getMandiUser(userId: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(environment.apiUrl + '/mandiusers/getMandiUser/' + userId);
  }
  createMandiUser(user: UserProfile): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(environment.apiUrl + '/mandiusers/createMandiUser', user);
  }
  updateMandiUser(userId:number, user: UserProfile): Observable<Apiresponse> {
    return this.http.put<Apiresponse>(environment.apiUrl + '/mandiusers/updateMandiUser/'+userId, user);
  }
  deleteMandiUser(userId: number): Observable<Apiresponse> {
    return this.http.delete<Apiresponse>(environment.apiUrl + '/mandiusers/deleteMandiUser/' + userId);
  }



}
