import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommoditiesService } from 'src/app/ratelist-services';
import { Subject } from 'rxjs';
import { UserService, StatesService, DistrictsService, TehsilService } from 'src/app/ratelist-services';
import { Apiresponse, Commodity, State, District, Tehsil, RateList, UserProfile } from 'src/app/ratelist-models';

import { faEdit, faSave, faEye } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'ratelist-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  faEdit = faEdit;
  faSave = faSave;
  faEye = faEye;
  //////
  userProfile: UserProfile = new UserProfile();
  loggedinUserId: number = 0;
  assignedStateId: number = 0;
  assignedDistrictId: number = 0;
  state: State = new State();
  district: District = new District();
  tehsils: Tehsil[] = [];
  tehsil: Tehsil = new Tehsil();
  ///////
  categories: Category[] = [];
  commodities: Commodity[] = [];
  commodityId: number = 0;
  loading: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  categoryName: string = "";
  rateList: RateList = new RateList();
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings = {};
  selecteditem: number = 0;
  commodityAndRateList: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private commodityService: CommoditiesService,
    private userService: UserService,
    private router: Router,
  ) {
  }
  ngOnInit(): void {
    this.getUserProfile();
    this.route.params.subscribe(params => {
      this.commodityId = params['commodityId'];
      this.getCommmodityById();
    });
    this.route.queryParams.subscribe(params => {
      this.categoryName = params['category'];
    }
    );
  }
  getCommmodityById() {
    this.loading = true;
    this.commodityService.getCommoditiesByCategory(this.commodityId).subscribe((data: Apiresponse) => {
      if (data.success) {
        this.commodities = data.data;
        this.commodityAndRateList = data.data.map((item: any) => {
          return {
            id: item.id,
            name: item.name,
            rateList: new RateList()
          }
        })
        this.loading = false;
      } else {
        this.loading = false;
        this.commodities = [];
      }
    }, (error) => {
      this.loading = false;
      this.commodities = [];
      console.log(error);
    });
  }
  
  view(id: number) {
    this.router.navigate(['/mandirate', id]);
  }
  goBack() {
    this.location.back();
  }
  getUserProfile() {
    this.userService.getUserProfile()
    .subscribe((data: Apiresponse) => {
      this.userProfile = data.data;
    }, (error) => {
      console.log(error);
    });
  }
  
  
}
