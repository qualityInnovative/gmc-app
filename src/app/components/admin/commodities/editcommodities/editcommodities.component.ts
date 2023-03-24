import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Commodity } from 'src/app/models/commodity';
import { Category } from 'src/app/ratelist-models';
import { Unit } from 'src/app/ratelist-models';
import { CommoditiesService } from 'src/app/ratelist-services';
import { CategoryService } from 'src/app/services/category/category.service';
import { UnitsService } from 'src/app/ratelist-services';
import { Apiresponse } from 'src/app/ratelist-models';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'ratelist-editcommodities',
  templateUrl: './editcommodities.component.html',
  styleUrls: ['./editcommodities.component.scss']
})
export class EditcommoditiesComponent implements OnInit {
  edit: boolean = false;
  commodity: Commodity = new Commodity();
  categories: Category[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commoditiesService: CommoditiesService,
    private categoryService: CategoryService,
    private Location: Location,
    private toastr: ToastrService,
  ) { }
  ngOnInit(): void {
    this.isEdit();
    this.getAllCategories();
  }
  isEdit() {
    this.route.params.subscribe(params => {
      if (params['commodityId'] != 0) {
        this.edit = true;
        this.getCommodity(params['commodityId']);
      } else {
        this.edit = false;
        console.log(this.edit, "not edit")
        console.log(this.commodity)
      }
    });
  }
  getCommodity(id: number) {
    this.commoditiesService.getCommodityById(id).subscribe(
      (response: any) => {
        this.commodity = response.data;
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
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

  saveCommodities() {
    if (this.edit) {
      this.updateCommodity();
    } else {
      this.addCommodity();
    }
  }
  addCommodity() {
    this.commoditiesService.addCommodity(this.commodity).subscribe(
      (response: any) => {
        console.log(response);
        this.toastr.success('Commodity added successfully');
        this.back();
      },
      (error: any) => {
        console.log(error);
        this.toastr.error(
          error.error.message,
        );
      }
    );
  }
  updateCommodity() {
    this.commoditiesService.updateCommodity(this.commodity).subscribe(
      (response: any) => {
        console.log(response);
        this.toastr.success('Commodity updated successfully');
        this.back();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  back() {
    this.Location.back();
  }

}
