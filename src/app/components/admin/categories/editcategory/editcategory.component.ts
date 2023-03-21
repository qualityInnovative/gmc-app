import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Category } from 'src/app/ratelist-models';
import { CategoryService } from 'src/app/services/category/category.service';
import { Apiresponse } from 'src/app/models/apiresponse';
import { Location } from '@angular/common';
@Component({
  selector: 'ratelist-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.scss']
})
export class EditcategoryComponent implements OnInit {
  edit: boolean = false;
  categoryId: number = 0;
  category: Category = new Category();
  error = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private location: Location
  ) { }
  ngOnInit(): void {
    this.isEdit();
  }

  saveCategory(){
    if(this.edit){
      this.updateCategory();
    }else{
      this.addCategory();
    }
  }
  getCategoryById(id:number){
    this.categoryService.admingetCategoryById(id).subscribe(
      (data) => {
        this.category = data.data;
        console.log(this.category);
      },
      (error) => {
        this.error = error;
      }
    )
  }
  isEdit(){
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];
      if(this.categoryId > 0){
        this.edit = true;
        this.getCategoryById(this.categoryId);
      }else{
        this.edit = false;
      }
    });
  }

  back(){
    this.location.back();
  }
  updateCategory(){
    this.categoryService.adminupdateCategory(this.category).subscribe(
      (data) => {
        this.back();
      },
      (error) => {
        this.error = error;
      }
    )
  }
  addCategory(){
    this.categoryService.adminaddCategory(this.category).subscribe(
      (data) => {
        this.back();
      },
      (error) => {
        this.error = error;
      }
    )
  }





}
