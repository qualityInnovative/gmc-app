import { Component, OnInit } from '@angular/core';

import { faEdit, faTrash, faPenToSquare, faEye } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { ComplaintsService } from 'src/app/services/complaints/complaints.service';
import { Apiresponse } from 'src/app/ratelist-models';
import { Complaint } from 'src/app/models/complaint';
import { ComplaintStatus } from "src/app/models/complaintStatus"
import { Router } from '@angular/router';
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

  constructor(
    private complaintsService: ComplaintsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      processing: true
    };
    this.getAllComplaintStatus();
    this.getAllComplaints();
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
    this.complaintsService.getAllComplaints()
      .subscribe((res: Apiresponse) => {
        this.loading = false;
        if (res.success) {
          this.complaints = res.data;
          console.log(this.complaints);
          this.dtTrigger.next(undefined);
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
}
