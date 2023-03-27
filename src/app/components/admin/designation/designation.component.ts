import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Designation } from 'src/app/models/designation';
import { DesignationService } from 'src/app/services/designation/designation.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'ratelist-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {
  loading: boolean = false;
  errorStatus: boolean = false;
  error: string = '';
  faEdit = faEdit;
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  designations: Designation[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private router: Router,
    private designationService: DesignationService,
    private location: Location
  ) { }
  

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getDesignations();
  }

  addDesignation() {
    //admin/designation/editdesignation/:id'
    this.router.navigate(['admin/designation/editdesignation', 0]);
  }
  editDesignation(id: number) {
    //admin/designation/editdesignation/:id'
    this.router.navigate(['admin/designation/editdesignation', id]);
  }
  deleteDesignation(id: number) {
    if(confirm("Are you sure to delete this record?")){
    this.loading = true;
    this.designationService.deleteDesignation(id).subscribe(
      (response: any) => {
        this.loading = false;
        this.errorStatus = false;
        this.getDesignations();
      },
      (error) => {
        this.loading = false;
        this.errorStatus = true;
        this.error = error.error.message;
      }
    );
    }else{
      return  
    }
  }
  getDesignations() {
    this.loading = true;
    this.designationService.getAllDesignations().subscribe(
      (response: any) => {
        this.loading = false;
        this.errorStatus = false;
        this.designations = response.data;
      },
      (error) => {
        this.loading = false;
        this.errorStatus = true;
        this.error = error.error.message;
      }
    );
  }

}
