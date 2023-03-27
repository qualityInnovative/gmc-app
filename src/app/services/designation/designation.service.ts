import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Designation } from 'src/app/models/designation';
import { Apiresponse } from 'src/app/models/apiresponse';
@Injectable({
  providedIn: 'root'
})
export class DesignationService {
  constructor(
    private http: HttpClient
  ) { }
  getAllDesignations() {
    return this.http.get<Apiresponse>(environment.apiUrl + '/designation/getall');
  }
  getDesignationById(id: number) {
    return this.http.get<Apiresponse>(environment.apiUrl + '/designation/getbyid/' + id);
  }
  saveDesignation(designation: Designation) {
    return this.http.post<Apiresponse>(environment.apiUrl + '/designation/add', designation);
  }
  updateDesignation(designation: Designation) {
    return this.http.put<Apiresponse>(environment.apiUrl + '/designation/update', designation);
  }
  deleteDesignation(id: number) {
    return this.http.delete<Apiresponse>(environment.apiUrl + '/designation/delete/' + id);
  }
}
