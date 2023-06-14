import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, Apiresponse } from '../../ratelist-models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Roles } from  './../../models/enums/roles'
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  roles = Roles;
  constructor(
    private http: HttpClient
  ) { }
  getToken(): string | undefined | null {
    return localStorage.getItem('token');
  }
  login(email: string, password: string): Observable<Apiresponse> {
    localStorage.clear();
    return this.http.post<Apiresponse>(`${environment.apiUrl}/user/login`, { email, password })
  }
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.clear();
  }
  isUserLoggedIn(): boolean {
    return !!this.getToken();
  }
  getLoggedInUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
  getUserProfile(id: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/user/get/${id}`)
  }
  updateUserProfile(user: User): Observable<Apiresponse> {
    return this.http.put<Apiresponse>(`${environment.apiUrl}/user/update`, user)
  }
  reloadHeaderComponent(): void {
    window.location.reload();
  }
  isAdminUser(): boolean {
    const user = this.getLoggedInUser();
    return user.roleId  === this.roles.admin;
  }

}
