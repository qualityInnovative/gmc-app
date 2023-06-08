import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/ratelist-models';
import { UserProfile } from 'src/app/ratelist-models';
import { AssignComplaint } from 'src/app/models/assignComplaint';
import { ComplaintsService } from 'src/app/services/complaints/complaints.service';
import { Subject } from 'rxjs';
import { Complaint } from 'src/app/models/complaint';
import { faEye, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ComplaintStatus } from 'src/app/models/complaintStatus';
import { Apiresponse } from 'src/app/ratelist-models';
import { Router } from '@angular/router';
@Component({
  selector: 'ratelist-deparmentcomplaints',
  templateUrl: './deparmentcomplaints.component.html',
  styleUrls: ['./deparmentcomplaints.component.scss']
})
export class DeparmentcomplaintsComponent implements OnInit {
  assignComplaints: AssignComplaint[] = [];
  currentUserId: number = 0;
  complaintIds: number[] = [];
  loading: boolean = false;
  errorStatus: boolean = false;
  error: string = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  complaints: Complaint[] = [];
  faEye = faEye;
  faTrash = faTrash;
  faEdit = faEdit;
  complaintStaus: ComplaintStatus[] = [];
  filterdComplaints: Complaint[] = [];
  complaintStauses: number[] = [];
  constructor(
    private complaintsService: ComplaintsService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      processing: true,
      dom: 'Bfrtip',
      order: [[0, 'desc']],
      initComplete: function () {
        $('#complaintsTable').DataTable(); // Initialize the datatable using the table ID
      }
    }
    this.getCurrentUser();
    this.getAllComplaintStatus();
  }
  getCurrentUser(): void {
    let user = localStorage.getItem('user') || '{}';
    this.currentUserId = JSON.parse(user).id;
    this.getAssignComplaintsAssignedToCurrentUser(this.currentUserId);
  }
  getAssignComplaintsAssignedToCurrentUser(id: number) {
    this.complaintsService.getAssignComplaintsAssignedToCurrentUser(id)
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          this.complaints = res.data;
          this.filterdComplaints = this.complaints;
          this.getNumberofComplaintswithStatus();
          //console.log('assign complaint', this.assignComplaints);
          this.dtTrigger.next(undefined);
        } else {
          console.log(res);
        }
      }
        , (err) => {
          console.log(err);
        });
  }
  getNumberofComplaintswithStatus() {
    // count the number of complaints with status 1,2,3,4,5,6,7
    let status1 = this.complaints.filter(x => x.ComplaintId == 1).length;
    let status2 = this.complaints.filter(x => x.ComplaintId == 2).length;
    let status3 = this.complaints.filter(x => x.ComplaintId == 3).length;
    let status4 = this.complaints.filter(x => x.ComplaintId == 4).length;
    let status5 = this.complaints.filter(x => x.ComplaintId == 5).length;
    let status6 = this.complaints.filter(x => x.ComplaintId == 6).length;
    let status7 = this.complaints.filter(x => x.ComplaintId == 7).length;
    this.complaintStauses = [status1, status2, status3, status4, status5, status6, status7];
  }
  getAllComplaintStatus() {
    this.complaintsService.getAllComplaintStatus()
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          this.complaintStaus = res.data;

        } else {
          console.log(res);
        }
      }
        , (err) => {
          console.log(err);
        });
  }
  getComplaintStatus(id: number) {
    return this.complaintStaus.find(x => x.id == id)?.status;
  }
  viewcomplain(id: number) {
    this.router.navigate([`department/complaints/complaindetail/${id}`]);
  }
  filterComplaints(status: Number) {
    console.log(status);
    this.filterdComplaints = this.complaints;
    if (status == 0) {
      this.filterdComplaints = this.complaints;
    } else {
      this.filterdComplaints = this.complaints.filter(x => x.ComplaintId == status);
    }
  }
  showLengthofComplaints() {


  }


}
