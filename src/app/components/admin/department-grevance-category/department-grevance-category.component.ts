import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeparmentService } from 'src/app/services/departmant/deparment.service';
import { Department } from 'src/app/models/department';
import { faEdit, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { DepartmentGrevanceCategory } from 'src/app/models/DepartmentGrevanceCategory';
import { SharedService } from 'src/app/services/shared/shared.service';
@Component({
  selector: 'ratelist-department-grevance-category',
  templateUrl: './department-grevance-category.component.html',
  styleUrls: ['./department-grevance-category.component.scss']
})
export class DepartmentGrevanceCategoryComponent implements OnInit {
  edi(arg0: any) {
    throw new Error('Method not implemented.');
  }
  faEdit = faEdit;
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  DepartmentGrevanceCategory: DepartmentGrevanceCategory[] = [];
  loading: boolean = false;
  errorStatus: boolean = false;
  error: string = '';
  departments: Department[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private router: Router,
    private SharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getAllDepartmentgrevance();
  }
  adddepartmentgrevance(id: number) {
    this.router.navigate(['admin/departmentgrevancecategory/view', id]);
  }
  editdepartmentgrevance(id: number) {
    this.router.navigate(['admin/departmentgrevancecategory/view', id]);
  }
  deletedepartmentgrevance(id:any) { 
    if(!confirm("are you sure you want to delete it ?")){
      return 
    }
    this.SharedService.deleteCategory(id)
    .subscribe((res)=>{
      this.getAllDepartmentgrevance();
    })
  }
  getAllDepartmentgrevance() {
    this.loading = true;
    this.SharedService
      .getAllCategories()
      .subscribe((res) => {
        this.DepartmentGrevanceCategory = res.data
        console.log(res.data)
        this.loading = false
      }, err => {
        console.log(err)
      })

  }

}
