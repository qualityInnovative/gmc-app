import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/ratelist-models';
import { UserProfile } from 'src/app/ratelist-models';
import { AssignComplaint } from 'src/app/models/assignComplaint';
import { ComplaintsService } from 'src/app/services/complaints/complaints.service';
import { Subject } from 'rxjs';
import { Complaint } from 'src/app/models/complaint';
import {faEye, faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import { ComplaintStatus } from 'src/app/models/complaintStatus';
import { Apiresponse } from 'src/app/ratelist-models';
import { Router } from '@angular/router';

@Component({
  selector: 'ratelist-deparmenthome',
  templateUrl: './deparmenthome.component.html',
  styleUrls: ['./deparmenthome.component.scss']
})
export class DeparmenthomeComponent implements OnInit {
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
  typeCount: { type: number, count: number }[] = [];

  constructor(
    private complaintsService: ComplaintsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllComplaintStatus();
    this.getCurrentUser();
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
          console.log('assign complaint', this.assignComplaints);
          this.getComplaintsTypeCount(this.complaints);
        } else {
          console.log(res);
        }
      }
        , (err) => {
          console.log(err);
        });
  }
  getAllComplaintStatus() {
    this.complaintsService.getAllComplaintStatus()
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          this.complaintStaus = res.data;
          console.log('complaint status',this.complaintStaus);
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
    // department/complaints/complaindetail/:id
    this.router.navigate([`department/complaints/complaindetail/${id}`]);
  }
  getComplaintsTypeCount(complaints: Complaint[]) {
    console.log('count;',complaints);
    complaints.forEach((complaint) => {
      let type = complaint.ComplaintId;
      let index = this.typeCount.findIndex((x) => x.type == type);
      if (index == -1) {
        this.typeCount.push({ type: type, count: 1 });
      } else {
        this.typeCount[index].count++;
      }
     
    });
    console.log('typeesjkdklsajd kjsak jdklaj  ',this.typeCount);
  }

}
