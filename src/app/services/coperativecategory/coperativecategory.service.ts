import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoprativeCategory } from 'src/app/models/coprativecategory';
import { environment } from 'src/environments/environment';
import { Apiresponse } from 'src/app/ratelist-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoperativecategoryService {
  constructor(
    private http: HttpClient
  ) { }
  getCoprativeCategories():Observable<Apiresponse>  {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/coprativecategories/getall`)
  }
  getCoprativeCategoryById(id:number):Observable<Apiresponse>  {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/coprativecategories/getbyid/${id}`)
  }
  updateCoprativeCategory(CoprativeCategory:CoprativeCategory):Observable<Apiresponse>  {
    return this.http.post<Apiresponse>(`${environment.apiUrl}/coprativecategories/update`,CoprativeCategory)
  }
  addCoprativeCategory(CoprativeCategory:CoprativeCategory):Observable<Apiresponse>  {
    return this.http.post<Apiresponse>(`${environment.apiUrl}/coprativecategories/add`,CoprativeCategory)
  }
  deleteCoprativeCategory(id:number):Observable<Apiresponse>  {
    return this.http.delete<Apiresponse>(`${environment.apiUrl}/coprativecategories/delete/${id}`)
  }
  getAllCoprativeCategories():Observable<Apiresponse>  {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/coprativecategories/getall`)
  }
}
