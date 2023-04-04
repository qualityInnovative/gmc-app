import { Component, OnInit } from '@angular/core';
import { RetailratelistService } from 'src/app/services/retailratelist/retailratelist.service';
import { RetailRateList } from 'src/app/models/retailRateList';
import { Apiresponse } from 'src/app/ratelist-models';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import { CommoditiesService } from 'src/app/ratelist-services';
import { Commodity } from 'src/app/ratelist-models';

import { MandiService } from 'src/app/services/mandi/mandi.service';
import { Mandi } from 'src/app/models/mandi';

import { DistrictsService } from 'src/app/ratelist-services';
import { District } from 'src/app/ratelist-models';

import { Unit } from 'src/app/ratelist-models';
import { UnitsService } from 'src/app/ratelist-services';


@Component({
  selector: 'ratelist-admin-retailratelist',
  templateUrl: './admin-retailratelist.component.html',
  styleUrls: ['./admin-retailratelist.component.scss']
})
export class AdminRetailratelistComponent implements OnInit {
  retailratelist: RetailRateList[] = [];
  loading = false;
  errorStatus = false;
  error = '';
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  commodities: Commodity[] = [];
  districts: District[] = [];
  mandis: Mandi[] = [];
  units: Unit[] = [];


  constructor(
    private retailratelistService: RetailratelistService,
    private router: Router,
    private commoditiesService: CommoditiesService,
    private mandiService: MandiService,
    private districtsService: DistrictsService,
    private unitsService: UnitsService
  ) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getRetailRateList();
    this.getCommodities();
    this.getDistricts();
    this.getMandis();
    this.getUnits();
  }
  getDistricts() {
    this.districtsService
    .getAllDistricts()
    .subscribe((res: Apiresponse) => {
      this.districts = res.data;
      console.log(this.districts);
    });
  }
  getMandis() {
    this.mandiService
    .getallMandis()
    .subscribe((res: Apiresponse) => {
      this.mandis = res.data;
      console.log(this.mandis);
    });
  }
  getUnits() {
    this.unitsService
    .getUnits()
    .subscribe((res: Apiresponse) => {
      this.units = res.data;
      console.log(this.units);
    });
  }
  getUnitName(id: number) {
    const unit = this.units.find(x => x.id === id);
    return unit ? unit.name : '';
  }
  getDistrictName(id: number) {
    const district = this.districts.find(x => x.id === id);
    return district ? district.name : '';
  }
  getMandiName(id: number) {
    const mandi = this.mandis.find(x => x.id === id);
    return mandi ? mandi.name : '';
  }
  getCommodities() {
    this.commoditiesService
    .getAllCommodities()
    .subscribe((res: Apiresponse) => {
      this.commodities = res.data;
      console.log(this.commodities);
    });
  }
  getRetailRateList() {
    this.retailratelistService
    .getRetailRateList()
    .subscribe((res: Apiresponse) => {
      this.retailratelist = res.data;
      console.log(this.retailratelist);
    });
  }
  getCommodityName(id: number) {
    const commodity = this.commodities.find(x => x.id === id);
    return commodity ? commodity.name : '';
  }
  addratelist() {
    this.router.navigate(['admin/adminretailratelist/editadminretaillist',0]);
  }
  editratelist(id: number) {
    this.router.navigate(['admin/adminretailratelist/editadminretaillist', id]);
  }
  deleteratelist(id: number) {
    this.retailratelistService
    .deleteRetailRateList(id)
    .subscribe((res: Apiresponse) => {
      this.getRetailRateList();
    });
  }


}
