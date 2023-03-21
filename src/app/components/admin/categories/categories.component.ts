import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {faEdit,faTrash} from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/ratelist-models';
import { CategoryService } from 'src/app/services/category/category.service';
@Component({
  selector: 'ratelist-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  loading = false;
  error = '';
  faEdit = faEdit;
  faTrash = faTrash;
  errorStatus = 0;
  categories: Category[] = [];
  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) { }
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories(){
    this.loading = true;
    this.categoryService.admingetCategories().subscribe(
      (data) => {
        this.categories = data.data;
        this.loading = false;
      },
      (error) => {
        this.error = error;
        this.loading = false;
      }
    )
  }
  addCategory(){
    //admin/categories/editcategory/:categoryId
    this.router.navigate(['/admin/categories/editcategory/0']);
  }
  editCategory(id:number){
    //admin/categories/editcategory/:categoryId
    this.router.navigate(['/admin/categories/editcategory/'+id]);
  }
  deleteCategory(id:number){
   // confirm('Are you sure you want to delete this category?');
   if(confirm('Are you sure you want to delete this category?')){
    this.categoryService.admindeleteCategory(id).subscribe(
      (data) => {
        this.getCategories();
      },
      (error) => {
        this.error = error;
      }
    )
   }

  }



}
