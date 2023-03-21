import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Commodity } from 'src/app/models/commodity';
import { CommoditiesService } from 'src/app/ratelist-services';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category';
import { UnitsService } from 'src/app/ratelist-services';
import { Unit } from 'src/app/models/unit';
import { Apiresponse } from 'src/app/ratelist-models';
import { Observable } from 'rxjs';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'ratelist-commodities',
  templateUrl: './commodities.component.html',
  styleUrls: ['./commodities.component.scss']
})
export class CommoditiesComponent implements OnInit {
  loading = false;
  error = '';
  errorStatus: number = 0;
  pageNumbers: number[] = [];
  commodities: Commodity[] = [];
  page: number = 1;
  faEdit = faEdit;
  faTrash = faTrash;
  categories: Category[] = [];
  units: Unit[] = [];
  currentdrugPage: number = 1;
  totalPages:number=0;
  commodityPages: number[] = [];
  constructor(
    private router: Router,
    private commoditiesService: CommoditiesService,
    private categoryService: CategoryService,
    private unitsService: UnitsService,

    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.getAllCategories();
    this.getAllUnits();
    this.route.queryParams.subscribe(params => {
      this.page = params['page'] || 1;
      this.getCommodities(this.page);
    });
  }
  getCommodities(page: number) {
    this.loading = true;
    this.commoditiesService.getCommodities(page).subscribe(
      (response: Apiresponse) => {
        console.log(response)
        this.commodities = response.data;
        this.pageNumbers = Array(response.pages).fill(0).map((x, i) => i + 1);
        this.loading = false;
      },
      (error: any) => {
        this.error = error.error.message;
        this.errorStatus = error.status;
        this.loading = false;
      }
    );
  }
  addCommodities() {
    this.router.navigate(['/admin/commodities/editcommodity/0']);
  }
  editCommodities(id: number) {
    this.router.navigate(['/admin/commodities/editcommodity/' + id]);
  }
  deleteCommodities(id: number) {
    console.log(id);
  }
  getAllCategories() {
    this.categoryService.admingetCategories().subscribe(
      (response: any) => {
        this.categories = response.data;
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getAllUnits() {
    this.unitsService.getUnits().subscribe(
      (response: any) => {
        this.units = response.data;
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getUnitName(id: number) {
    let unitName = this.units.find(unit => unit.id == id)?.name;
    return unitName;
  }
  getCategoryName(id: number) {
    let categoryName = this.categories.find(category => category.id == id)?.name;
    return categoryName;
  }
}

