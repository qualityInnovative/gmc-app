import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeparmentService } from 'src/app/services/departmant/deparment.service';
import { Department } from 'src/app/models/department';
import { faEdit, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { DepartmentGrevanceCategory } from 'src/app/models/DepartmentGrevanceCategory';
import { SharedService } from 'src/app/services/shared/shared.service';
import { DepartmentGrevanceSubCategory } from 'src/app/models/DepartmentGrevanceSubCategory';
import { Route } from '@angular/router';
@Component({
  selector: 'ratelist-departmentsubcategory',
  templateUrl: './departmentsubcategory.component.html',
  styleUrls: ['./departmentsubcategory.component.scss']
})
export class DepartmentsubcategoryComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  DepartmentGrevancesubCategory:any[]=[]
  faEdit = faEdit;
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  DepartmentGrevanceCategory: DepartmentGrevanceCategory[] = [];
  loading: boolean = false;
  errorStatus: boolean = false;
  error: string = '';
  departments: Department[] = [];
  departmentGrevanceSubCategory:DepartmentGrevanceSubCategory[]=[];
  constructor(
    private sharedService:SharedService,
    private departmentservice:DeparmentService,
    private router:Router
  ) { }
  ngOnInit(): void {
    this.getalldepartmentGrevanceSubCategory();
  }

  getalldepartmentGrevanceSubCategory(){
    this.sharedService.getAllSubCategories()
    .subscribe((res)=>{
      this.departmentGrevanceSubCategory=res.data
      console.log(res.data)
    },err=>{
      console.log(err);
    })
  }
  adddepartmentsubgrevance(id:number){
    this.router.navigate(["admin/departmentgrevancsubegategory/view",id])
  }
  editdepartmentsubgrevance(id:number){
    this.router.navigate(["admin/departmentgrevancsubegategory/view",id])
  }
  deletedepartmentsubgrevance(id:number){
    if(!confirm("do you want to delete ")){
      return
    }
    this.sharedService.deleteSubCategory(id)
    .subscribe((res)=>{
      console.log(res)
      this.getalldepartmentGrevanceSubCategory()
    })
  }

}
