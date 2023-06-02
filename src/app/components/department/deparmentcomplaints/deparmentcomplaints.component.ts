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
  constructor(
    private complaintsService: ComplaintsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllComplaintStatus();
    this.getCurrentUser();
    this.getAssignComplaints();
   }
  getCurrentUser(): void {
    let user = localStorage.getItem('user') || '{}';
    this.currentUserId = JSON.parse(user).id;
  }
  getAssignComplaints(): void {
    this.complaintsService.getAssignComplaints(this.currentUserId).subscribe(
      async (response) => {
        this.assignComplaints = response.data;
        let s = await this.getAllComplaintId();
        console.log(s);
        // remove duplicate complaint ids
        s= [...new Set(s)];
        console.log('duplicates removed',s);
       this.getComplaintsFromAcogs(s);
       
      },
      (error) => {
        console.log(error);
      });
  }
   getAllComplaintId(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.assignComplaints.forEach((assignComplaint) => {
        this.complaintIds.push(assignComplaint.complaintId);
      });
      resolve(this.complaintIds);
    });
  }
  getComplaintsFromAcogs(complaintIds: number[]): void {
    this.loading = true;
    this.complaintsService.getComplaintsFromAcogs(complaintIds).subscribe(
      (response) => {
        console.log(response);
        this.loading = false;
        this.complaints = response.data;
        console.log(this.complaints)
      },
      (error) => {
        console.log(error);
        this.loading = false;
        this.errorStatus = true;
        this.error = error.message;

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
    console.log(id);
    return this.complaintStaus.find(x => x.id == id)?.status;
  }
  viewcomplain(id: number) {
    // department/complaints/complaindetail/:id
    this.router.navigate([`department/complaints/complaindetail/${id}`]);
  }




}
