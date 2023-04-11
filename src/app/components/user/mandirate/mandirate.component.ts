import { Component, OnInit } from '@angular/core';
import { Commodity, Mandi, UserProfile, Apiresponse, District, Unit, Mandicommoditypricing } from 'src/app/ratelist-models';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CommoditiesService } from 'src/app/ratelist-services';
import { MandiService } from 'src/app/services/mandi/mandi.service';
import { LoginService } from 'src/app/ratelist-services';
import { UserService } from 'src/app/ratelist-services';
import { StatesService } from 'src/app/ratelist-services';
import { UnitsService } from 'src/app/ratelist-services';
import { ToastrService } from 'ngx-toastr';
import { MandicommoditypricingService } from 'src/app/services/mandicommoditypricing/mandicommoditypricing.service';
@Component({
  selector: 'ratelist-mandirate',
  templateUrl: './mandirate.component.html',
  styleUrls: ['./mandirate.component.scss']
})
export class MandirateComponent implements OnInit {
  commodity: Commodity = new Commodity();
  commodities: Commodity[] = [];
  units: Unit[] = [];
  mandi: Mandi = new Mandi();
  mandis: Mandi[] = [];
  userProfile: UserProfile = new UserProfile();
  commodityId: number = 0;
  userStateId: number = 0;
  selectedMandiId: number = 0;
  districts: District[] = [];
  mandicommoditypricing: Mandicommoditypricing = new Mandicommoditypricing();
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private commodityService: CommoditiesService,
    private mandiService: MandiService,
    private loginService: LoginService,
    private userService: UserService,
    private statesService: StatesService,
    private unitsService: UnitsService,
    private toastr: ToastrService,
    private mandicommoditiesService: MandicommoditypricingService

  ) {
    this.commodityId = this.route.snapshot.params['commodityId'];
  }
  ngOnInit(): void {
    this.getUserProfile();
    this.getCommodityById(this.commodityId);
    this.getUnits();
  }
  getUnits() {
    this.unitsService.getUnits()
      .subscribe((data: Apiresponse) => {
        this.units = data.data;
      }, (error) => {
        console.log(error);
      });
  }

  getCommodityById(commodityId: number) {
    this.commodityService.getCommodityById(commodityId).subscribe((res: any) => {
      this.commodity = res.data;
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
  back() {
    this.location.back();
  }
  save() {
    console.log(this.mandicommoditypricing)
    this.mandicommoditypricing.commodityId = this.commodityId;
    this.mandicommoditypricing.mandiId = this.selectedMandiId;
    this.mandicommoditypricing.createdBy = this.userProfile.Profile.userId;
    if (this.mandicommoditypricing.effectiveStartDate == null) {
      this.toastr.error('Please select effective start date');
      return;
    }
    if (this.mandicommoditypricing.effectiveEndDate == null) {
      this.toastr.error('Please select effective end date');
      return;
    }
    if (this.mandicommoditypricing.effectiveStartTime == null) {
      this.toastr.error('Please select effective start time');
      return;
    }
    if (this.mandicommoditypricing.effectiveEndTime == null) {
      this.toastr.error('Please select effective end time');
      return;
    }
    if (this.mandicommoditypricing.price == 0) {
      this.toastr.error('Please enter price');
      return;
    }
    if (this.mandicommoditypricing.unitId == 0) {
      this.toastr.error('Please select unit');
      return;
    }
    this.mandicommoditiesService
      .saveMandiCommodityPricing(this.mandicommoditypricing)
      .subscribe((data: Apiresponse) => {
        if (data.success) {
          this.toastr.success('Mandi Commodity Pricing saved successfully', 'Success');
          this.back();
        } else {
          this.toastr.error(data.message, 'Error');
        }
      });
  }
}

