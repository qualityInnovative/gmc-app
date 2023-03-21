import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/ratelist-models';
import { environment } from 'src/environments/environment';
import { Apiresponse } from 'src/app/ratelist-models';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient
  ) { }
  getAllUsers(): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(environment.apiUrl + '/user/get');
  }
  getUserById(id: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(environment.apiUrl + '/user/get/' + id);
  }
  getUserRoles(): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(environment.apiUrl + '/roles/getall');
  }
  updateUser(user: UserProfile): Observable<Apiresponse> {
    return this.http.put<Apiresponse>(environment.apiUrl + '/user/update/'+user.id, user);
  }
  deleteUser(id: number): Observable<Apiresponse> {
    return this.http.delete<Apiresponse>(environment.apiUrl + '/user/delete/' + id);
  }
  getUserProfile(): Observable<Apiresponse> {
    let user =localStorage.getItem('user') || '{}'
    let id = JSON.parse(user).id
    return this.http.get<Apiresponse>(`${environment.apiUrl}/user/get/${id}`)
  }
}
