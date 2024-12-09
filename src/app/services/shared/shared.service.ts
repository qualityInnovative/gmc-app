import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private baseUrl = environment.acogsApiUrl; // Base URL from environment configuration

  constructor(private http: HttpClient) {}
 

  // Department Grevance Category APIs
  getAllCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/departmentGrevanceCategory/getall`);
  }
  

  getCategoryById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/departmentGrevanceCategory/getbyid/${id}`);
  }

  getCategoriesByDepartmentId(departmentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/departmentGrevanceCategory/getbydepartment/${departmentId}`);
  }

  addCategory(category: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/departmentGrevanceCategory/add`, category);
  }

  updateCategory(category: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/departmentGrevanceCategory/update`, category);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/departmentGrevanceCategory/delete/${id}`);
  }

  // Department Grevance SubCategory APIs
  getAllSubCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/departmentGrevanceSubCategory/getall`);
  }

  getSubCategoryById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/departmentGrevanceSubCategory/getbyid/${id}`);
  }

  getSubCategoriesByCategoryId(categoryId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/departmentGrevanceSubCategory/getbycategory/${categoryId}`);
  }

  addSubCategory(subCategory: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/departmentGrevanceSubCategory/add`, subCategory);
  }

  updateSubCategory(subCategory: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/departmentGrevanceSubCategory/update`,subCategory);
  }

  deleteSubCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/departmentGrevanceSubCategory/delete/${id}`);
  }
}
