import { Component, OnInit } from '@angular/core';
import { Apiresponse, Mandi, Commodity, Unit } from 'src/app/ratelist-models';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { StatesService } from 'src/app/services/states/states.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Mandicommoditypricing } from 'src/app/models/mandicommoditypricing';
// mandi commodity unit service
import { MandiService } from 'src/app/services/mandi/mandi.service';
import { CommoditiesService } from 'src/app/ratelist-services';
import { UnitsService } from 'src/app/ratelist-services';
import { MandicommoditypricingService } from 'src/app/services/mandicommoditypricing/mandicommoditypricing.service';
import { LoginService } from 'src/app/ratelist-services';
@Component({
  selector: 'ratelist-editmandicommoditypricing',
  templateUrl: './editmandicommoditypricing.component.html',
  styleUrls: ['./editmandicommoditypricing.component.scss']
})
export class EditmandicommoditypricingComponent implements OnInit {
  loading = false;
  edit: boolean = false;
  faEdit = faEdit;
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  mandis: Mandi[] = [];
  commodities: Commodity[] = [];
  units: Unit[] = [];
  mandicommoditypricing: Mandicommoditypricing = new Mandicommoditypricing();
  mandicommoditypricingId: number = 0;
  loggedInUserId: number = 0;
  constructor(
    private router: Router,
    private statesService: StatesService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private location: Location,
    private mandiService: MandiService,
    private commoditiesService: CommoditiesService,
    private unitsService: UnitsService,
    private mandicommoditypricingService: MandicommoditypricingService,
    private loginService: LoginService
  ) {
    this.route.params.subscribe(params => {
      this.mandicommoditypricingId = params['id'];
    });
  }
  ngOnInit(): void {
    this.isEdit();
    this.getMandis();
    this.getCommodities();
    this.getUnits();
    this.loggedInUserId = this.loginService.getLoggedInUser().id;
  }
  isEdit() {
    if (this.mandicommoditypricingId > 0) {
      this.edit = true;
      this.getMandiCommodityPricingById(this.mandicommoditypricingId);

    } else {
      this.edit = false;
    }
  }
  getMandis() {
    this.mandiService
      .getallMandis()
      .subscribe((data: Apiresponse) => {
        if (data.success) {
          this.mandis = data.data;
        }
      });
  }
  getCommodities() {
    this.commoditiesService.getAllCommodities()
      .subscribe((data: Apiresponse) => {
        if (data.success) {
          this.commodities = data.data;

        }
      });
  }
  getUnits() {
    this.unitsService.getUnits().subscribe((data: Apiresponse) => {
      if (data.success) {
        this.units = data.data;
      }
    });
  }
  back() {
    this.location.back();
  }
  save() {
    if (this.edit) {
      this.updateMandiCommodityPricing();
    } else {
      this.savemandicommoditypricing();
    }
  }
  savemandicommoditypricing() {
    this.mandicommoditypricing.approvedUserId = this.loggedInUserId;
    
    if (this.mandicommoditypricing.price == 0) {
      this.toastr.warning('Please select price', 'Warning');
      return;
    }
    if (this.mandicommoditypricing.mandiId == 0) {
      this.toastr.warning('Please select mandi', 'Warning');
      return;
    }
    if (this.mandicommoditypricing.commodityId == 0) {
      this.toastr.warning('Please select commodity', 'Warning');
      return;
    }
    if (this.mandicommoditypricing.unitId == 0) {
      this.toastr.warning('Please select unit', 'Warning');
      return;
    }
    // check start date and end date is valid
    if (this.mandicommoditypricing.effectiveStartDate > this.mandicommoditypricing.effectiveEndDate) {
      this.toastr.warning('Start date should be less than end date', 'Warning');
      return;
    }
    if (this.mandicommoditypricing.effectiveStartDate == this.mandicommoditypricing.effectiveEndDate) {
      if (this.mandicommoditypricing.effectiveStartTime > this.mandicommoditypricing.effectiveEndTime) {
        this.toastr.warning('Start time should be less than end time', 'Warning');
        return;
      }
    }
    console.log(this.mandicommoditypricing);
    this.mandicommoditypricingService
      .saveMandiCommodityPricing(this.mandicommoditypricing)
      .subscribe((data: Apiresponse) => {
        if (data.success) {
          this.toastr.success('Mandi Commodity Pricing saved successfully', 'Success');
          this.router.navigate(['/admin/mandicommoditypricing']);
        } else {
          this.toastr.error(data.message, 'Error');
        }
      });
  }
  updateMandiCommodityPricing() {
    this.mandicommoditypricing.approvedUserId = this.loggedInUserId;
    console.log(this.mandicommoditypricing)
    this.mandicommoditypricingService
      .updateMandiCommodityPricing(this.mandicommoditypricing)
      .subscribe((data: Apiresponse) => {
        if (data.success) {
          this.toastr.success('Mandi Commodity Pricing updated successfully', 'Success');
          this.router.navigate(['/admin/mandicommoditypricing']);
        } else {
          this.toastr.error(data.message, 'Error');
        }
      });
  }
  getMandiCommodityPricingById(id: number) {
    this.mandicommoditypricingService
      .getMandiCommodityPricingById(id)
      .subscribe((data: Apiresponse) => {
        if (data.success) {
          this.mandicommoditypricing = data.data;
        }
      });
  }
}


