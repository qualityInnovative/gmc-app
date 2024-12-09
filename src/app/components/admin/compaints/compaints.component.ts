import { Component, OnInit } from '@angular/core';
import { faTrash, faPenToSquare, faEye } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { ComplaintsService } from 'src/app/services/complaints/complaints.service';
import { Apiresponse } from 'src/app/ratelist-models';
import { Complaint } from 'src/app/models/complaint';
import { ComplaintStatus } from "src/app/models/complaintStatus";
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
  loading: boolean = true;
  errorStatus: boolean = false;
  error: string = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  complaints: Complaint[] = [];
  complaintStaus: ComplaintStatus[] = [];
  Users: UserProfile[] = [];

  data: any = { rows: [], count: 0 };
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  totalPagesArray: number[] = [];

  constructor(
    private complaintsService: ComplaintsService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      processing: true
    };
    this.getAllComplaintStatus();
    this.getAllUsers();
    this.getSortedComplaintsbyType("0", this.itemsPerPage, this.currentPage);
  }

  getSortedComplaintsbyType(complaintType: string, perPage: number, page: number) {
    this.loading = true;
    this.errorStatus = false;
    this.error = '';
    this.complaintsService.getSortedComplaintsbyType(complaintType, perPage, page)
      .subscribe((res: any) => {
        this.data = res.data;
        this.complaints = res.data.rows;
        this.totalPages = Math.ceil(res.totalRecords / this.itemsPerPage);
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.loading = false;
      }, (err) => {
        this.loading = false;
        this.errorStatus = true;
        this.error = err.message;
      });
  }

  // Methods to handle page change
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getSortedComplaintsbyType("0", this.itemsPerPage, this.currentPage);
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getSortedComplaintsbyType("0", this.itemsPerPage, this.currentPage);
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getSortedComplaintsbyType("0", this.itemsPerPage, this.currentPage);
    }
  }

  getAllUsers() {
    this.userService
      .getAllUsers()
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          this.Users = res.data;
        }
      }, (err) => {
        this.loading = false;
        this.errorStatus = true;
        this.error = err.message;
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
            this.getSortedComplaintsbyType("0", this.itemsPerPage, this.currentPage);
          }
        }, (err) => {
          console.log(err);
        });
    }
  }

  getAllComplaintStatus() {
    this.complaintsService
      .getAllComplaintStatus()
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          this.complaintStaus = res.data;
        } else {
          console.log(res);
        }
      }, (err) => {
        console.log(err);
      });
  }

  getComplaintStatus(id: number) {
    return this.complaintStaus.find(x => x.id == id)?.status;
  }
}
