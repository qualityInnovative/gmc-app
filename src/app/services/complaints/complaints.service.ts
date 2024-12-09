import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apiresponse } from 'src/app/ratelist-models';
import { environment } from 'src/environments/environment';
import { AssignComplaint } from 'src/app/models/assignComplaint';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {
  constructor(
    private http: HttpClient
  ) { }
  getAllComplaintsToadminDashboard(): Observable<any> {
    return  this.http.post(`${environment.acogsApiUrl}/complaint/totalcomplaints`, {});
  }
  getAllComplaints(): Observable<any> {
    return  this.http.post(`${environment.acogsApiUrl}/complaint/getallcomplaintoadmin`, {});
  }
  getAllComplaintStatus(): Observable<any> {
    return  this.http.get(`${environment.acogsApiUrl}/complaint/getallcomplainstatus`, {});
  }
  deleteComplaint(id: number): Observable<any> {
    return  this.http.delete(`${environment.acogsApiUrl}/complaint/admindeletecomplaint/${id}`, {});
  }
  getComplaintById(id: number): Observable<any> {
    return  this.http.get(`${environment.acogsApiUrl}/complaint/getcomplaintbyid/${id}`);
  }
  changeComplaintStatus(ComplaintStatusId: string,complaintId:number): Observable<any> {
    return  this.http.put(`${environment.acogsApiUrl}/complaint/changecomplaintstatus/${ComplaintStatusId}/${complaintId}`, {});
  }
  getAllDeparmentUserFromComplainDistrict(departmentId: number): Observable<any> {
    return  this.http.get(`${environment.apiUrl}/complaint/getalldepartmentuserfromcomplaindistrict/${departmentId}`, {});
  }
  submitComplain(assignComplaint: AssignComplaint): Observable<any> {
    return  this.http.post(`${environment.apiUrl}/complaint/submitcomplaint`, assignComplaint);
  }
  getAssignComplaints(assignedTo: number): Observable<any> {
    return  this.http.post(`${environment.apiUrl}/complaint/getcomplaintsAssignedToUser`,{assignedTo});
  }
  // getComplaintsFromAcogs takes an array of complaint ids and returns an array of complaints
  getComplaintsFromAcogs(complaintIds: number[]): Observable<any> {
    return  this.http.post(`${environment.acogsApiUrl}/complaint/getcomplaintsfromacogs`, {complaintIds});
  }
  getComplaintRemarkHistory(complaintId: number): Observable<any> {
    return  this.http.get(`${environment.apiUrl}/complaint/getcomplaintremarkhistory/${complaintId}`);
  }
  assignComplaintinacogs(userId: string,complaintId:number): Observable<any> {
    return  this.http.post(`${environment.acogsApiUrl}/complaint/assigncomplaintinacogs`, {userId,complaintId});
  }
  getAssignComplaintsAssignedToCurrentUser(id: number): Observable<any> {
    return  this.http.get(`${environment.acogsApiUrl}/complaint/getassigncomplaintsassignedtouser/${id}`);
  }
  // this.c.getSortedComplaintsbyType(complaintType, perPage, page)
  getSortedComplaintsbyType(complaintType: string, perPage: number, page: number): Observable<any> {
    return  this.http.post(`${environment.acogsApiUrl}/complaint/getsortedcomplaintsbytype`, {complaintType, perPage, page});
  }
    
}
