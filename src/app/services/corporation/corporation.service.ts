import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Corporation } from 'src/app/models/corporation';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Apiresponse } from 'src/app/ratelist-models';

@Injectable({
  providedIn: 'root'
})
export class CorporationService {
  private apiServerUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }
  getCorporations(): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${this.apiServerUrl}/corporation/getall`);
  }
  getCorporation(id: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${this.apiServerUrl}/corporation/getbyid/${id}`);
  }
  saveCorporation(corporation: Corporation): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(`${this.apiServerUrl}/corporation/add`, corporation);
  }
  deleteCorporation(id: number): Observable<Apiresponse> {
    return this.http.delete<Apiresponse>(`${this.apiServerUrl}/corporation/delete/${id}`);
  }
  updateCorporation(corporation: Corporation): Observable<Apiresponse> {
    return this.http.put<Apiresponse>(`${this.apiServerUrl}/corporation/update`, corporation);
  }
  getuserfromadmincorporation(id:number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${this.apiServerUrl}/corporation/getuserfromadmincorporation/${id}`);
  }
  uploadCorporationImage(image: File): Observable<Apiresponse> {
    const formData = new FormData();
    formData.append('image', image);
    console.log('service',FormData);
   return this.http.post<Apiresponse>(`${this.apiServerUrl}/corporation/upload`, formData);
  }

}
