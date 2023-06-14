import { Injectable } from '@angular/core';
import { Banner } from 'src/app/models/banner';
import { Apiresponse } from 'src/app/ratelist-models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(
    private http: HttpClient,

  ) { }

  getBanners(): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/banners/getall`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;

    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  getBanner(id: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/banners/get/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  addBanner(banner: Banner): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(`${environment.apiUrl}/banners/add`, banner)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  updateBanner(banner: Banner): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(`${environment.apiUrl}/banners/update`, banner)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  deleteBanner(id: number): Observable<Apiresponse> {
    return this.http.delete<Apiresponse>(`${environment.apiUrl}/banners/delete/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  

}
