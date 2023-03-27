import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeparmentService } from 'src/app/services/departmant/deparment.service';
import { Department } from 'src/app/models/department';
import { faEdit, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
@Component({
  selector: 'ratelist-editdeparment',
  templateUrl: './editdeparment.component.html',
  styleUrls: ['./editdeparment.component.scss']
})
export class EditdeparmentComponent implements OnInit {
  edit: boolean = false;
  faEdit = faEdit;
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  loading: boolean = false;
  errorStatus: boolean = false;
  error: string = '';
  department: Department = new Department();
  deparmentId: number = 0;
  constructor(
    private router: Router,
    private departmentService: DeparmentService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.deparmentId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.isEdit();
  }
  isEdit() {
    if (this.deparmentId > 0) {
      this.edit = true;
      this.getDepartmentById();
    } else {
      this.edit = false;
    }
  }
  getDepartmentById() {
    this.loading = true;
    this.departmentService.getDepartmentById(this.deparmentId).subscribe(
      (response: any) => {
        this.loading = false;
        this.errorStatus = false;
        this.department = response.data;
      },
      (error) => {
        this.loading = false;
        this.errorStatus = true;
        this.error = error.error.message;
      }
    );
  }
  back() {
    this.location.back();
  }


  saveDeparment() {
    if (this.edit) {
      this.loading = true;
      this.departmentService.updateDepartment(this.department).subscribe(
        (response: any) => {
          this.loading = false;
          this.errorStatus = false;
          this.router.navigate(['/admin/departments']);
        },
        (error) => {
          this.loading = false;
          this.errorStatus = true;
          this.error = error.error.message;
        }
      );
    }
    else {
      this.loading = true;
      this.departmentService.saveDepartment(this.department).subscribe(
        (response: any) => {
          this.loading = false;
          this.errorStatus = false;
          this.router.navigate(['/admin/departments']);
        },
        (error) => {
          this.loading = false;
          this.errorStatus = true;
          this.error = error.error.message;
        }
      );
    }
  }
}
