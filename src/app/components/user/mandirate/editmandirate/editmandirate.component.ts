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
  selector: 'ratelist-editmandirate',
  templateUrl: './editmandirate.component.html',
  styleUrls: ['./editmandirate.component.scss']
})
export class EditmandirateComponent implements OnInit {
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
    this.getMandis();
    this.getCommodities();
    this.getUnits();
    this.loggedInUserId = this.loginService.getLoggedInUser().id;
    this.getMandiCommodityPricingById(this.mandicommoditypricingId);
  }
  getMandiCommodityPricingById(id: number) {
    this.mandicommoditypricingService
      .getMandiCommodityPricingById(id)
      .subscribe((data: Apiresponse) => {
        if (data.success) {
          this.mandicommoditypricing = data.data;
          this.mandicommoditypricing.effectiveStartDate = this.mandicommoditypricing.effectiveStartDate.split('T')[0];
          this.mandicommoditypricing.effectiveEndDate = this.mandicommoditypricing.effectiveEndDate.split('T')[0];
        }
      });
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
  updateMandiCommodityPricing() {
    console.log(this.mandicommoditypricing)
    this.mandicommoditypricingService
      .updateMandiCommodityPricing(this.mandicommoditypricing)
      .subscribe((data: Apiresponse) => {
        if (data.success) {
          this.toastr.success(data.message);
          this.back();
        } else {
          this.toastr.error(data.message);
        }
      });
  }
  back() {
    this.location.back();
  }
  save() {
    this.updateMandiCommodityPricing();
  }
}
