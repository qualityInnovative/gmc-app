import { Injectable } from '@angular/core';
import { Category } from 'src/app/ratelist-models';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Apiresponse } from 'src/app/models/apiresponse';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(
    private http: HttpClient
  ) { }
  admingetCategories():Observable<Apiresponse>  {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/categories/getall`)
  }
  admingetCategoryById(id:number):Observable<Apiresponse>  {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/categories/getbyid/${id}`)
  }
  adminupdateCategory(category:Category):Observable<Apiresponse>  {
    return this.http.post<Apiresponse>(`${environment.apiUrl}/categories/update`,category)
  }
  adminaddCategory(category:Category):Observable<Apiresponse>  {
    return this.http.post<Apiresponse>(`${environment.apiUrl}/categories/add`,category)
  }
  admindeleteCategory(id:number):Observable<Apiresponse>  {
    return this.http.delete<Apiresponse>(`${environment.apiUrl}/categories/delete/${id}`)
  }
  getAllCategories():Observable<Apiresponse>  {
    return this.http.get<Apiresponse>(`${environment.apiUrl}/categories/getall`)
  }
  uploadCategoryImage(image:File):Observable<Apiresponse>  {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<Apiresponse>(`${environment.apiUrl}/categories/upload`,formData)
  }
}
