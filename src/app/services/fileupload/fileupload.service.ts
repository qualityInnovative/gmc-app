import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor(
    private http: HttpClient

  ) { }
  uploadProfileImage(data:any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/upload/save`, data);
  }

}
