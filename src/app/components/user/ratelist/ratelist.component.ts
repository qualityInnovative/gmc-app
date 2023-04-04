import { Component, OnInit } from '@angular/core';
import { CommoditiesService } from 'src/app/ratelist-services';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService, StatesService, DistrictsService, TehsilService } from 'src/app/ratelist-services';
import { Apiresponse, Commodity, State, District, Tehsil, RateList, UserProfile } from 'src/app/ratelist-models';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { RatelistService } from 'src/app/services/ratelist/ratelist.service';
import { Mandicommoditypricing } from 'src/app/ratelist-models';
import { RetailRateList } from 'src/app/models/retailRateList';
import { Unit } from 'src/app/ratelist-models';
import { UnitsService } from 'src/app/ratelist-services';
import { MandiService } from 'src/app/services/mandi/mandi.service';
import { Mandi } from 'src/app/models/mandi';
import { RetailratelistService } from 'src/app/services/retailratelist/retailratelist.service';
import { CommodityAndRateList } from 'src/app/models/CommodityAndRateList';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/ratelist-services';
@Component({
  selector: 'ratelist-ratelist',
  templateUrl: './ratelist.component.html',
  styleUrls: ['./ratelist.component.scss']
})

export class RatelistComponent implements OnInit {
  commodity: Commodity = new Commodity();
  userProfile: UserProfile = new UserProfile();
  loggedinUserId: number = 0;
  assignedStateId: number = 0;
  assignedDistrictId: number = 0;
  state: State = new State();
  district: District = new District();
  districts: District[] = [];
  tehsils: Tehsil[] = [];
  tehsil: Tehsil = new Tehsil();
  mandi: Mandi = new Mandi();
  mandis: Mandi[] = [];
  mandicommoditypricing: Mandicommoditypricing = new Mandicommoditypricing();
  retailRateList: RetailRateList = new RetailRateList();
  units: Unit[] = [];
  unit: Unit = new Unit();
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings = {};
  selecteditem: number = 0;

  mandiAndRateList: any[] = [];
  commodityAndRateList: CommodityAndRateList = new CommodityAndRateList();
  /////
  userStateId: number = 0;
  userMandiId: number = 0;
  selectedCommodityId: number = 0;
  selectedDistrictId: number = 0;
  selectedMandiId: number = 0;
  selectedUnitId: number = 0;
  //////

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private commodityService: CommoditiesService,
    private userService: UserService,
    private statesService: StatesService,
    private districtsService: DistrictsService,
    private tehsilService: TehsilService,
    private ratelistservice: RatelistService,
    private unitsService: UnitsService,
    private mandiService: MandiService,
    private retailratelistService: RetailratelistService,
    private router: Router,
    private loginService: LoginService
    
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.commodity.id = params['commodityId'];
      this.getCommmodityById();
    });
    this.getUserProfile();
    this.getUnits();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }
  unitSelected(event: HTMLSelectElement | any) {
    this.selectedUnitId = event.target.value;
    console.log(event.target.value);

  }
  getRetailandMandiPrice(
    commodityId: number,
    districtId: number,
    mandiId: number,
    unitId: number
  ) {
    this.retailratelistService
      .getRetailandMandiPrice(
        commodityId,
        districtId,
        mandiId,
        unitId
      )
      .subscribe((data: Apiresponse) => {
        this.commodityAndRateList = data.data;
        this.retailRateList.mandiPrice = this.commodityAndRateList.mandiPrice;
        this.retailRateList.retailPrice = (this.commodityAndRateList.retailPriceFactor * this.commodityAndRateList.mandiPrice) + this.commodityAndRateList.mandiPrice;
      }, (error) => {
        console.log(error);
      });
  }
  getUnits() {
    this.unitsService.getUnits()
      .subscribe((data: Apiresponse) => {
        this.units = data.data;
      }, (error) => {
        console.log(error);
      });
  }
  getCommmodityById() {
    this.commodityService.getCommodityById(this.commodity.id)
      .subscribe((data: Apiresponse) => {
        this.commodity = data.data;
      }, (error) => {
        console.log(error);
      });
  }
  getUserProfile() {
    this.userService.getUserProfile()
      .subscribe((data: Apiresponse) => {
        this.userProfile = data.data;
        this.userStateId = this.userProfile.Profile.stateId;
        this.selectedMandiId = this.userProfile.Profile.mandiId;
        this.getDistrictsByStateId(this.userStateId);
        if (this.userProfile.Profile.mandiId != null) {
          this.getMandiNameById(this.selectedMandiId);
        }
      }, (error) => {
        console.log(error);
      });
  }
  getDistrictsByStateId(stateId: number) {
    this.statesService.getDistrictsofstate(stateId)
      .subscribe((data: Apiresponse) => {
        this.districts = data.data;
      }, (error) => {
        console.log(error);
      });
  }
  getMandiNameById(mandiId: number) {
    this.mandiService.adminGetMandiById(mandiId).subscribe((data: Apiresponse) => {
      this.mandi = data.data;
    }, (error) => {
      console.log(error);
    });
  }
  districtSelected(event: HTMLSelectElement | any) {
    this.selectedDistrictId = event.target.value;
    this.getRetailandMandiPrice(this.commodity.id, this.selectedDistrictId, this.selectedMandiId, this.selectedUnitId);
  }
  back() {
    this.location.back();
  }
  getTehsilratelist(event: any) { }
  onSelectAll(items: any) {
    this.selectedItems = items;
  }
  OnItemDeSelect(item: any) {
    this.selectedItems = this.selectedItems.filter((i: any) => i.id !== item.id);
  }
  onItemSelect(item: any) {
    this.selectedItems.push(item);
  }
  onDeSelectAll(items: any) {
    this.selectedItems = [];
  }
  save() {
    this.retailRateList.commodityId = this.commodity.id;
    this.retailRateList.mandiId = this.selectedMandiId;
    this.retailRateList.unitId = this.selectedUnitId;
    console.log(this.retailRateList)
    this.retailRateList.createdBy = this.loginService.getLoggedInUser().id;
    this.retailratelistService.saveRetailRateList(this.retailRateList)
      .subscribe((data: Apiresponse) => {
        this.location.back();
      }, (error) => {
        console.log(error);
      });
  }
  // saveRateList() {
  //   if (this.edit) {
  //     console.log(this.retailratelist);
  //     this.retailratelistService.
  //       updateRetailRateList(this.retailratelistId, this.retailratelist).
  //       subscribe((res: Apiresponse) => {
  //         this.router.navigate(['admin/adminretailratelist']);
  //       });
  //   } else {
  //     console.log(this.retailratelist);
  //     this.retailratelist.approvedByUserId= this.loginService.getLoggedInUser().id;
  //     this.retailratelistService.saveRetailRateList(this.retailratelist)
  //       .subscribe((res: Apiresponse) => {
  //         this.router.navigate(['admin/adminretailratelist']);
  //       });
  //   }
  // }
}

