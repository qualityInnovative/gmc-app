import { Component, OnInit } from '@angular/core';
import { Apiresponse, District, Mandi, Commodity,Unit } from 'src/app/ratelist-models';
import { DistrictsService } from 'src/app/ratelist-services';

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
  constructor(
    private router: Router,
    private statesService: StatesService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private location: Location,
    private mandiService: MandiService,
    private commoditiesService: CommoditiesService,
    private unitsService: UnitsService,
    private mandicommoditypricingService: MandicommoditypricingService
  ) { }
  ngOnInit(): void {
    this.getMandis();
    this.getCommodities();
    this.getUnits();
   }
  getMandis() {
    this.mandiService
    .getallMandis()
    .subscribe((data: Apiresponse) => {
      if (data.success) {
        this.mandis = data.data;
        console.log(this.mandis);
      }
    });
  }
  getCommodities() {
    this.commoditiesService.getAllCommodities()
    .subscribe((data: Apiresponse) => {
      if (data.success) {
        this.commodities = data.data;
        console.log(this.commodities);
      }
    });
  }
  getUnits() {
    this.unitsService.getUnits().subscribe((data: Apiresponse) => {
      if (data.success) {
        this.units = data.data;
        console.log(this.units);
      }
    });
  }

  back() {
    this.location.back();
  }
  savemandicommoditypricing() {
    console.log(this.mandicommoditypricing)
    this.toastr.success(
      JSON.stringify(this.mandicommoditypricing),'Success');
  }

}
