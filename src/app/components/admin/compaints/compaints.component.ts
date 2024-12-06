import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash, faPenToSquare, faEye } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { ComplaintsService } from 'src/app/services/complaints/complaints.service';
import { Apiresponse } from 'src/app/ratelist-models';
import { Complaint } from 'src/app/models/complaint';
import { ComplaintStatus } from "src/app/models/complaintStatus"
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/ratelist-models';
import { UserService } from 'src/app/ratelist-services';
@Component({
  selector: 'ratelist-compaints',
  templateUrl: './compaints.component.html',
  styleUrls: ['./compaints.component.scss']
})
export class CompaintsComponent implements OnInit {
  faEye = faEye;
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  loading: boolean = false;
  errorStatus: boolean = false;
  error: string = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  complaints: Complaint[] = [];
  complaintStaus: ComplaintStatus[] = [];
  Users: UserProfile[] = [];
  constructor(
    private complaintsService: ComplaintsService,
    private router: Router,
    private userService: UserService
  ) { }
  ngOnInit(): void {
    this.getAllComplaints();
    this.getAllComplaintStatus();

    this.getAllUsers();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      searching: true,
      ordering: true
    };
  }
  getAllUsers() {
    this.userService
      .getAllUsers()
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          this.Users = res.data;
        }
      }, (err) => {
        console.log(err);
      });
  }
  getUserById(id: number) {
    if (id == 0 || id == null) {
      return 'Admin';
    }
    return this.Users.find(x => x.id == id)?.Profile?.firstName + ' ' + this.Users.find(x => x.id == id)?.Profile?.lastName;
  }

  log() {
    console.log('log');
  }
  viewcomplain(id: number) {
    this.router.navigate(['admin/complaints/complaindetail', id]);
  }

  deletecomplain(complaint: any) {
    if (confirm('Are you sure to delete this record ?')) {
      this.complaintsService.deleteComplaint(complaint.id)
        .subscribe((res: Apiresponse) => {
          if (res.success) {
            this.getAllComplaints();

          }
        }, (err) => {
          console.log(err);
        });
    }
  }
  getAllComplaints() {
    this.loading = true;
    this.errorStatus = false;
    this.error = '';
    this.complaintsService
      .getAllComplaints()
      .subscribe((res: Apiresponse) => {
        this.loading = false;
        if (res.success) {
          this.complaints = res.data;
          this.dtTrigger.next(res.data);
          console.log(this.complaints, 'dsdsdsds');

        } else {
          this.errorStatus = true;
          this.error = res.message;
        }

      }, (err) => {
        this.loading = false;
        this.errorStatus = true;
        this.error = err.message;
      });
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
}
