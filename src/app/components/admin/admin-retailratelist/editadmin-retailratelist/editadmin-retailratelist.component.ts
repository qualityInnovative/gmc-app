import { Component, OnInit } from '@angular/core';
import { RetailratelistService } from 'src/app/services/retailratelist/retailratelist.service';
import { RetailRateList } from 'src/app/models/retailRateList';
import { Apiresponse } from 'src/app/ratelist-models';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { CommoditiesService } from 'src/app/ratelist-services';
import { Commodity } from 'src/app/ratelist-models';
import { Unit } from 'src/app/ratelist-models';
import { UnitsService } from 'src/app/ratelist-services';
import { DistrictsService } from 'src/app/ratelist-services';
import { District } from 'src/app/ratelist-models';

import { MandiService } from 'src/app/services/mandi/mandi.service';
import { Mandi } from 'src/app/models/mandi';
@Component({
  selector: 'ratelist-editadmin-retailratelist',
  templateUrl: './editadmin-retailratelist.component.html',
  styleUrls: ['./editadmin-retailratelist.component.scss']
})
export class EditadminRetailratelistComponent implements OnInit {
  edit: boolean = false;
  commodities: Commodity[] = [];
  districts: District[] = [];
  mandis: Mandi[] = [];
  units: Unit[] = [];
  retailratelist: RetailRateList = new RetailRateList();
  retailratelistId: number = 0;
  loading = false;
  errorStatus = false;
  error = '';
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  selectedCommodityId: number = 0;
  selectedDistrictId: number = 0;
  selectedMandiId: number = 0;
  selectedUnitId: number = 0;

  constructor(
    private retailratelistService: RetailratelistService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private commoditiesService: CommoditiesService,
    private mandiService: MandiService,
    private districtsService: DistrictsService,
    private unitsService: UnitsService
  ) {
    this.retailratelistId = this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.getAllCommodities();
    this.getAllDistricts();
    this.getAllMandis();
    this.getAllUnits();
    this.isEdit();
  }
  getAllCommodities() {
    this.commoditiesService.getAllCommodities()
      .subscribe((res: Apiresponse) => {
        this.commodities = res.data;
        console.log(this.commodities);
      });
  }
  getAllMandis() {
    this.mandiService.getallMandis()
      .subscribe((res: Apiresponse) => {
        this.mandis = res.data;
        console.log(this.mandis);
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


  isEdit() {
    if (this.retailratelistId > 0) {
      this.edit = true;
      this.getRetailRateList();
    }else{
      this.retailratelist.mandiPrice=0;
      this.retailratelist.retailPrice=0;
    }
  }
  commoditySelected(event: HTMLSelectElement | any) {
    console.log(event.target.value);
    this.selectedCommodityId = event.target.value;
  }
  mandiSelected(event: HTMLSelectElement | any) {
    console.log(event.target.value);
    this.selectedMandiId = event.target.value;
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
      this.selectedMandiId,
      this.selectedUnitId
    )
  }
  getRetailRateList() {
    this.retailratelistService.getRetailRateListById(this.retailratelistId)
      .subscribe((res: Apiresponse) => {
        this.retailratelist = res.data;
        console.log(this.retailratelist);
      });
  }
  saveRateList() {
    if (this.edit) {
      console.log(this.retailratelist);
      this.retailratelistService.
        updateRetailRateList(this.retailratelistId, this.retailratelist).
        subscribe((res: Apiresponse) => {
          this.router.navigate(['admin/adminretailratelist']);
        });
    } else {
      console.log(this.retailratelist);
      this.retailratelistService.saveRetailRateList(this.retailratelist)
        .subscribe((res: Apiresponse) => {
          this.router.navigate(['admin/adminretailratelist']);
        });
    }
  }
  back() {
    this.location.back();
  }
}
