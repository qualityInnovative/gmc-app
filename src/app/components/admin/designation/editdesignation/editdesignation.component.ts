import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Designation } from 'src/app/models/designation';
import { DesignationService } from 'src/app/services/designation/designation.service';
import { faEdit, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ratelist-editdesignation',
  templateUrl: './editdesignation.component.html',
  styleUrls: ['./editdesignation.component.scss']
})
export class EditdesignationComponent implements OnInit {
  edit: boolean = false;
  faEdit = faEdit;
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  loading: boolean = false;
  errorStatus: boolean = false;
  error: string = '';
  designation: Designation = new Designation();
  designationId: number = 0;
  constructor(
    private router: Router,
    private designationService: DesignationService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.designationId = this.activatedRoute.snapshot.params['id'];
  }

 

  ngOnInit(): void {
    this.isEdit();
  }
  isEdit() {
    if (this.designationId > 0) {
      this.edit = true;
      this.getDesignationById();
    } else {
      this.edit = false;
    }
  }
  getDesignationById() {
    this.loading = true;
    this.designationService.getDesignationById(this.designationId).subscribe(
      (response: any) => {
        this.loading = false;
        this.errorStatus = false;
        this.designation = response.data;
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
  saveDesignation() {
    if (this.edit) {
      this.updateDesignation();
    }
    else {
      this.addDesignation();
    }
  }
  addDesignation() {
    this.loading = true;
    this.designationService.saveDesignation(this.designation).subscribe(
      (response: any) => {
        this.loading = false;
        this.errorStatus = false;
        this.router.navigate(['/admin/designation']);
      },
      (error) => {
        this.loading = false;
        this.errorStatus = true;
        this.error = error.error.message;
      }
    );
  }
  updateDesignation() {
    this.loading = true;
    this.designationService.updateDesignation(this.designation).subscribe(
      (response: any) => {
        this.loading = false;
        this.errorStatus = false;
        this.router.navigate(['/admin/designation']);
      },
      (error) => {
        this.loading = false;
        this.errorStatus = true;
        this.error = error.error.message;
      }
    );
  }



}
