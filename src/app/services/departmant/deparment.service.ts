import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Department } from 'src/app/models/department';
import { Apiresponse } from 'src/app/models/apiresponse';
@Injectable({
  providedIn: 'root'
})
export class DeparmentService {

  constructor(
    private http: HttpClient
  ) { }
  getAllDepartments() {
    return this.http.get<Apiresponse>(environment.acogsApiUrl + '/department/getall');
  }
  getDepartmentById(id: number) {
    return this.http.get<Apiresponse>(environment.acogsApiUrl + '/department/getbyid/' + id);
  }
  saveDepartment(department: Department) {
    return this.http.post<Apiresponse>(environment.acogsApiUrl + '/department/add', department);
  }
  updateDepartment(department: Department) {
    return this.http.put<Apiresponse>(environment.acogsApiUrl + '/department/update', department);
  }
}
