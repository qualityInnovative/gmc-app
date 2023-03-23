import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Mandi } from 'src/app/ratelist-models';
import { MandiService } from 'src/app/services/mandi/mandi.service';
@Component({
  selector: 'ratelist-mandi',
  templateUrl: './mandi.component.html',
  styleUrls: ['./mandi.component.scss']
})
export class MandiComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  mandis: Mandi[] = [];
  faEdit = faEdit;
  faTrash = faTrash;
  loading = false;
  error = '';
  errorStatus = false;
  faPenToSquare = faPenToSquare;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private mandiService: MandiService
  ){}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getAllMandis();
   }
  getAllMandis() {
    this.loading = true;
    this.mandiService.getallMandis().subscribe(
      (response) => {
        this.loading = false;
        if (response.success) {
          console.log(response.data);
          this.mandis = response.data;
          this.dtTrigger.next(this.mandis);
        } else {
          this.error = response.message;
          this.errorStatus = true;
        }
      },
      (error) => {
        this.loading = false;
        this.error = error.message;
        this.errorStatus = true;
      }
    );
  }
  editMandi(mandi: Mandi) {
    //admin/mandi/editmandi/
    this.router.navigate(['/admin/mandi/editmandi', mandi.id]);
  }
  deleteMandi(mandi: Mandi) {
    if(!confirm('Are you sure to delete this mandi?')) {
      return;
    }
    this.loading = true;
    this.mandiService.adminDeleteMandi(mandi.id).subscribe(
      (response) => {
        this.loading = false;
        if (response.success) {
          this.toastr.success('Mandi deleted successfully');
          this.getAllMandis();
        } else {
          this.toastr.error(response.message);
        }
      },
      (error) => {
        this.loading = false;
        this.toastr.error(error.message);
      }
    );

  }
  addMandi() {
    this.router.navigate(['/admin/mandi/editmandi', 0]);
  }
}
