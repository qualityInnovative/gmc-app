import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeparmentService } from 'src/app/services/departmant/deparment.service';
import { Department } from 'src/app/models/department';
import {faEdit , faTrash,faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
@Component({
  selector: 'ratelist-deparments',
  templateUrl: './deparments.component.html',
  styleUrls: ['./deparments.component.scss']
})
export class DeparmentsComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  loading: boolean = false;
  errorStatus: boolean = false;
  error: string = '';
  departments: Department[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private router: Router,
    private departmentService: DeparmentService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getAllDepartments();
  }
  addDepartment(){
    //admin/deparments/editdeparment/:id'
    this.router.navigate(['admin/deparments/editdeparment',0]);
  }
  editDepartment(id:number){
    //admin/deparments/editdeparment/:id'
    this.router.navigate(['admin/deparments/editdeparment',id]);
  }
  deleteDepartment(id:number){}
  getAllDepartments(){
    this.loading = true;
    this.departmentService.getAllDepartments().subscribe(
      (response: any) => {
        this.loading = false;
        this.errorStatus = false;
        this.departments = response.data;
        this.dtTrigger.next(undefined);
      },
      (error) => {
        this.loading = false;
        this.errorStatus = true;
        this.error = error.error.message;
      }
    );
  }

}
