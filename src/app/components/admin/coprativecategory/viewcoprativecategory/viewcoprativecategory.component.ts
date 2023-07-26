import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoprativeCategory } from 'src/app/models/coprativecategory';
import { CoperativecategoryService } from 'src/app/services/coperativecategory/coperativecategory.service';
import { Location } from '@angular/common';
@Component({
  selector: 'ratelist-viewcoprativecategory',
  templateUrl: './viewcoprativecategory.component.html',
  styleUrls: ['./viewcoprativecategory.component.scss']
})
export class ViewcoprativecategoryComponent implements OnInit {
  edit: boolean = false;
  coprativecategoryId: number = 0;
  coprativecategory: CoprativeCategory = new CoprativeCategory();
  error = '';
  errorStatus = 0;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private coprativecategoryService: CoperativecategoryService
  ) { }
  ngOnInit(): void {
    this.isEdit();
  }
  isEdit(){
    this.route.params.subscribe(params => {
      this.coprativecategoryId = params['id'];
      if(this.coprativecategoryId > 0){
        this.edit = true;
        this.getCoprativeCategoryById(this.coprativecategoryId);
      }else{
        this.edit = false;
      }
    });
  }
  getCoprativeCategoryById(id:number){
    this.coprativecategoryService.getCoprativeCategoryById(id).subscribe(
      (data) => {
        this.coprativecategory = data.data;
       
      },
      (error) => {
        this.error = error;
        this.errorStatus = error.status;
      }
    )
  }
  back(){
    this.location.back();
  }
  onFileChange(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.coprativecategory.image = (event.target as any).result as string
       
      }
    }
  }
  updateCategory(){
    this.coprativecategoryService.
    updateCoprativeCategory
    (this.coprativecategory).subscribe(
      (data) => {
        this.back();
      },
      (error) => {
        this.error = error;
      }
    )
  }
  addCategory(){
    this.coprativecategoryService.
    addCoprativeCategory
    (this.coprativecategory).subscribe(
      (data) => {
        this.back();
      },
      (error) => {
        this.error = error;
      }
    )
  }
  savecoprativecategory(){
    if(this.edit){
      this.updateCategory();
    }else{
      this.addCategory();
    }
  }
}
