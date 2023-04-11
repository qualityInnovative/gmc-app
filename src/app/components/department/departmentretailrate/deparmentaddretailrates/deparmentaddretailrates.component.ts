import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RetailRateList } from 'src/app/models/retailRateList';
import { RetailratelistService } from 'src/app/services/retailratelist/retailratelist.service';
import { Apiresponse } from 'src/app/ratelist-models';
import { Commodity } from 'src/app/models/commodity';
import { District } from 'src/app/models/district';
import { Mandi } from 'src/app/models/mandi';
import { Unit } from 'src/app/models/unit';
import { CommoditiesService } from 'src/app/ratelist-services';
import { DistrictsService } from 'src/app/ratelist-services';
import { MandiService } from 'src/app/services/mandi/mandi.service';
import { UnitsService } from 'src/app/ratelist-services';
import { LoginService } from 'src/app/ratelist-services';
import { Router, ActivatedRoute } from '@angular/router';

import { UserProfile } from 'src/app/ratelist-models';
import { UserService } from 'src/app/ratelist-services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ratelist-deparmentaddretailrates',
  templateUrl: './deparmentaddretailrates.component.html',
  styleUrls: ['./deparmentaddretailrates.component.scss']
})
export class DeparmentaddretailratesComponent implements OnInit {
  edit:boolean = false;
  retailratelist: RetailRateList = new RetailRateList();
  retailratelistId: number = 0;
  loading = false;
  errorStatus = false;
  error = '';
  selectedCommodityId: number = 0;
  selectedDistrictId: number = 0;
  selectedMandiId: number = 0;
  selectedUnitId: number = 0;
  commodities: Commodity[] = [];
  districts: District[] = [];
  mandis: Mandi[] = [];
  units: Unit[] = [];
  user: UserProfile = new UserProfile();
  mandiId: number = 0;
  loggedInUserId: number = 0;
  constructor(
    private location: Location,
    private retailratelistService: RetailratelistService,
    private router: Router,
    private route: ActivatedRoute,
    private commoditiesService: CommoditiesService,
    private mandiService: MandiService,
    private districtsService: DistrictsService,
    private unitsService: UnitsService,
    private loginService: LoginService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe(params => {
      this.retailratelistId = params['id'];
    });
   }

  ngOnInit(): void {
    this.getUserProfile();
    this.getAllCommodities();
    this.getAllDistricts();
    this.getAllUnits();
    this.isEdit();
  }
  isEdit() {
    if (this.retailratelistId > 0) {
      this.edit = true;
      this.getRetailRateListById(this.retailratelistId);
    }else{
      this.edit = false;
    }
  }
  getRetailRateListById(id: number) {
    this.retailratelistService.getRetailRateListById(id)
      .subscribe((res: Apiresponse) => {
        this.retailratelist = res.data;
        console.log(this.retailratelist);
      });
  }
  getUserProfile() {
    this.userService.getUserProfile().subscribe(
      (data: Apiresponse) => {
        
        this.mandiId = data.data.Profile.mandiId;
        this.loggedInUserId = data.data.Profile.userId;
        console.log(this.mandiId, this.loggedInUserId);
      },
      (error) => {
        console.log(error);
      })
  }

  
  back(): void {this.location.back();}
  getAllCommodities() {
    this.commoditiesService.getAllCommodities()
      .subscribe((res: Apiresponse) => {
        this.commodities = res.data;
        console.log(this.commodities);
      });
  }
  getAllDistricts() {
    this.districtsService.getAllDistricts()
      .subscribe((res: Apiresponse) => {
        this.districts = res.data;
        console.log(this.districts);
      });
  }
  getAllUnits() {
    this.unitsService.getUnits()
      .subscribe((res: Apiresponse) => {
        this.units = res.data;
        console.log(this.units);
        
      });
  }
  commoditySelected(event: HTMLSelectElement | any) {
    //console.log(event.target.value);
    let categoryId = 0;

    this.commodities.forEach((commodity) => {
      if (commodity.id == event.target.value) {
        categoryId = commodity.categoryId;
      }
    });
    console.log("commodities",this.commodities);
    this.retailratelist.categoryId = categoryId;
    this.selectedCommodityId = event.target.value;
  }
 
  districtSelected(event: HTMLSelectElement | any) {
    console.log(event.target.value);
    this.selectedDistrictId = event.target.value;
  }
  unitSelected(event: HTMLSelectElement | any) {
    this.selectedUnitId=event.target.value;
    console.log(event.target.value);
    this.getRetailandMandiPrice(
      this.selectedCommodityId,
      this.selectedDistrictId,
      this.mandiId,
      this.selectedUnitId
    )
  }
  getRetailandMandiPrice(commodityId: number, districtId: number, mandiId: number, unitId: number) {
    if(commodityId==0 || districtId==0 || mandiId==0 || unitId==0){
      return;
    }
    this.retailratelistService.getRetailandMandiPrice(
      commodityId,
      districtId,
      mandiId,
      unitId
    )
      .subscribe((res: Apiresponse) => {
        this.retailratelist.mandiPrice = res.data.mandiPrice;
        this.retailratelist.retailPrice = (this.retailratelist.mandiPrice * res.data.retailPriceFactor)+this.retailratelist.mandiPrice;
        console.log(this.retailratelist);
      });
  }
  saveRateList() {
    this.retailratelist.mandiId = this.mandiId;
    this.retailratelist.commodityId = this.selectedCommodityId;
    this.retailratelist.districtId = this.selectedDistrictId;
    this.retailratelist.unitId = this.selectedUnitId;
    if (this.edit) {
      console.log(this.retailratelist);
      this.retailratelistService.
        updateRetailRateList(this.retailratelistId, this.retailratelist).
        subscribe((res: Apiresponse) => {
          this.toastr.success('Retail Rate List Updated Successfully');
          this.back();
        });
    } else {
      console.log(this.retailratelist);
      this.retailratelist.approvedByUserId= this.loginService.getLoggedInUser().id;
      this.retailratelist.createdBy= this.loginService.getLoggedInUser().id;
      this.retailratelistService.saveRetailRateList(this.retailratelist)
        .subscribe((res: Apiresponse) => {
          this.toastr.success('Retail Rate List Added Successfully');
          this.back();
        });
    }
  }


}
