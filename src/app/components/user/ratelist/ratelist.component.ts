import { Component, OnInit } from '@angular/core';
import { CommoditiesService } from 'src/app/ratelist-services';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService, StatesService, DistrictsService, TehsilService } from 'src/app/ratelist-services';
import { Apiresponse, Commodity, State, District, Tehsil, RateList, UserProfile } from 'src/app/ratelist-models';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { RatelistService } from 'src/app/services/ratelist/ratelist.service';
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
  tehsils: Tehsil[] = [];
  tehsil: Tehsil = new Tehsil();
  selectedTehsilId: number = 0;
  rateList: RateList = new RateList();
  ///////
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings = {};
  selecteditem: number = 0;
  constructor(
    private commodityService: CommoditiesService,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private statesService: StatesService,
    private districtsService: DistrictsService,
    private tehsilService: TehsilService,
    private ratelistservice: RatelistService,
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.commodity.id = params['commodityId'];
      this.getCommmodityById();
    });
    this.getUserProfile();
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
  getCommmodityById() {
    this.commodityService.getCommodityById(this.commodity.id).subscribe((data: Apiresponse) => {
      this.commodity = data.data;
      console.log(this.commodity);
    }, (error) => {
      console.log(error);
    });
  }
  getUserProfile() {
    this.userService.getUserProfile().subscribe((data: Apiresponse) => {
      this.userProfile = data.data;
      this.assignedStateId = this.userProfile.AssignedDistrict.stateId;
      this.assignedDistrictId = this.userProfile.AssignedDistrict.districtId;
      this.getStateById();
      console.log(this.assignedStateId);
      console.log(this.assignedDistrictId);
      this.getDistrictById();
      this.getTehsilsByDistrictId();
    }, (error) => {
      console.log(error);
    });
  }
  getTehsilsByDistrictId() {
    this.tehsilService.admingettehsilsfordistrict(this.assignedDistrictId).subscribe((data: Apiresponse) => {
      this.tehsils = data.data;
      console.log(this.tehsils);
    }, (error) => {
      console.log(error);
    });
  }
  getDistrictById() {
    this.districtsService.admingetDistrictById(this.assignedDistrictId).subscribe((data: Apiresponse) => {
      this.district = data.data;
    }, (error) => {
      console.log(error);
    });
  }
  getStateById() {
    this.statesService.admingetStateById(this.assignedStateId).subscribe((data: Apiresponse) => {
      this.state = data.data;
    }, (error) => {
      console.log(error);
    });
  }
  back() {
    this.location.back();
  }
  getTehsilratelist(event: any) {
    this.selectedTehsilId = event.target.value;
    console.log(this.selectedTehsilId);
  }
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
    this.rateList.commodityId = this.commodity.id;
    console.log(this.rateList);
    console.log(this.selectedItems)
    if (this.selectedItems.length == 0) {
      alert("Please select atleast one item");
      return;
    }
    if (this.rateList.price == null || this.rateList.price == 0 || this.rateList.price == undefined) {
      alert("Please enter price");
      return;
    }
    let tehsils = this.selectedItems;
    let rateListObj = {
      tehsils: tehsils,
      commodityId: this.rateList.commodityId,
      tehsilId: this.rateList.tehsilId,
      price: this.rateList.price,
      effectiveStartDate: this.rateList.effectiveStartDate,
      effectiveEndDate: this.rateList.effectiveEndDate,

    }
    this.ratelistservice.addRateListfromMain(rateListObj).subscribe((data: Apiresponse) => {
      if (data.success == true) {
        alert("Rate list added successfully");
        this.location.back();
      } else {
        alert("Something went wrong");

      }
    });

  }
}

