import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/ratelist-models';
import { environment } from 'src/environments/environment';
import { Apiresponse } from 'src/app/ratelist-models';
@Injectable({
  providedIn: 'root'
})
export class DeparmentretailrateService {

  constructor(
    private http: HttpClient
  ) { }
  getAllUsersofMandi(mandiId: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/departmentuser/mandiusers/${mandiId}`);
  }
}
