import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeparmentService } from 'src/app/services/departmant/deparment.service';
import { Department } from 'src/app/models/department';
import { faEdit, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { DepartmentGrevanceCategory } from 'src/app/models/DepartmentGrevanceCategory';
import { SharedService } from 'src/app/services/shared/shared.service';
@Component({
  selector: 'ratelist-viewdepartment-grevance-category',
  templateUrl: './viewdepartment-grevance-category.component.html',
  styleUrls: ['./viewdepartment-grevance-category.component.scss']
})
export class ViewdepartmentGrevanceCategoryComponent implements OnInit {
  edit: boolean = false;
  faEdit = faEdit;
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  loading: boolean = false;
  errorStatus: boolean = false;
  error: string = '';
  departments: Department[] = []
  deparmentGrevanceId: number = 0;
  departmentGrevance: DepartmentGrevanceCategory = new DepartmentGrevanceCategory()
  constructor(
    private router: Router,
    private departmentService: DeparmentService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private sharedService: SharedService
  ) {
    this.deparmentGrevanceId = this.activatedRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.isEdit();
    this.getAllDepartments();
  }
  getAllDepartments() {
    this.departmentService
      .getAllDepartments()
      .subscribe((res) => {
        this.departments = res.data
        console.log(this.departments)
      })
  }
  isEdit() {
    if (this.deparmentGrevanceId > 0) {
      this.edit = true;
      this.getDepartmentgrevancebyid();

    } else {
      this.edit = false;
    }
  }
  getDepartmentgrevancebyid() {
    this.loading = true;
    this.sharedService
    .getCategoryById(this.deparmentGrevanceId)
      .subscribe((res) => {
        this.departmentGrevance = res.data
      }, err => {
        console.log(err)
      })
  }
  back() {
    this.location.back();
  }

  saveDepartment(): void {
    this.loading = true;
    if (this.edit) {
      // Handle update logic here
      this.sharedService.updateCategory(this.departmentGrevance).subscribe(
        (res) => {
          this.loading = false;
          this.router.navigate(['admin/departmentgrevancegategory']);
        },
        (err) => {
          this.loading = false;
          this.errorStatus = true;
          this.error = 'Error updating department grievance category';
          console.log(err);
        }
      );
    } else {
      // Handle create logic here
      this.sharedService.addCategory(this.departmentGrevance).subscribe(
        (res) => {
          this.loading = false;
          this.router.navigate(['admin/departmentgrevancegategory']);
        },
        (err) => {
          this.loading = false;
          this.errorStatus = true;
          this.error = 'Error creating department grievance category';
          console.log(err);
        }
      );
    }
  }
}
