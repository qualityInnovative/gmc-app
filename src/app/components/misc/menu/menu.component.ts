import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category';
import { Apiresponse } from 'src/app/models/apiresponse';
@Component({
  selector: 'ratelist-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  categories: Category[] = [];
  constructor(
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((data: Apiresponse) => {
      this.categories = data.data;
    });
  }

}
