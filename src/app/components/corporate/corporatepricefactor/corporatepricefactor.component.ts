import { Component, OnInit } from '@angular/core';
import { CorporationdiscountfactorService } from 'src/app/services/corporationdiscountfactor/corporationdiscountfactor.service';
import { Corporatepricefactor } from 'src/app/models/corporationdiscountfactor';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import { CommoditiesService } from 'src/app/ratelist-services';
import { UnitsService } from 'src/app/ratelist-services';

import {User } from 'src/app/ratelist-models';
import { LoginService } from 'src/app/ratelist-services';





import { Commodity,Unit } from 'src/app/ratelist-models';
import { Corporation } from 'src/app/models/corporation';
import { CorporationService } from 'src/app/services/corporation/corporation.service';



@Component({
  selector: 'ratelist-corporatepricefactor',
  templateUrl: './corporatepricefactor.component.html',
  styleUrls: ['./corporatepricefactor.component.scss']
})
export class CorporatepricefactorComponent implements OnInit {
  User:User= new User();
  faEye = faEye;
  corporatepricefactors: Corporatepricefactor[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  loading: boolean = true;
  errorStatus: boolean = false;
  error: string = "";
  commodities: Commodity[] = [];
  units: Unit[] = [];
  Corporation: Corporation[] = [];
  usercorporationId: number = 0;
  userId: number = 0;
  
  constructor(
    public corporationService: CorporationdiscountfactorService,
    public router: Router,
    public commodityService: CommoditiesService,
    public unitService: UnitsService,
    public corporation: CorporationService,
    public lo: LoginService
  ) {
    this.User = this.lo.getLoggedInUser();
    this.usercorporationId = this.User.CorporationId;
    this.userId = this.User.id;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 30,
      processing: true
    };
   }

  ngOnInit(): void {
    this.getcorporatepricefactorsByuserandcoporation(this.usercorporationId, this.userId);
    this.getCommodities();
    this.getUnits();
    this.getCorporation();
  }
  getcorporatepricefactorsByuserandcoporation(
    corporationId: number,
    userId: number
  ) {
    if(corporationId==0){
      this.errorStatus = true;
      this.loading = false;
      this.error = "Please Select Corporation";
      return 
    }
    this.corporationService
      .getcorporatepricefactorsByuserandcoporation(
        corporationId,
        userId
      )
      .subscribe(
        (res: any) => {
          this.corporatepricefactors = res.data;
          this.dtTrigger.next(res.data);
          this.loading = false;
          console.log(this.corporatepricefactors);
        },
        (error: any) => {
          this.errorStatus = true;
          this.loading = false;
          this.error = error.error.message;
          console.log(error);
        }
      );
  }

 
 
  getCorporation() {
    this.corporation.getCorporations
    ().subscribe((res: any) => {
      this.Corporation = res.data;
      console.log(this.Corporation);
    }, (error: any) => {
      console.log(error);
    })
  }
  getUnits() {
    this.unitService.getUnits
    ().subscribe((res: any) => {
      this.units = res.data;
      console.log(this.units);
    }, (error: any) => {
      console.log(error);
    })
  }
  getCommodities() {
    this.commodityService.getAllCommodities
    ().subscribe((res: any) => {
      this.commodities = res.data;
      console.log(this.commodities);
    }, (error: any) => {
      console.log(error);
    })
  }
  getallcorporatepricefactor() {
    this.corporationService.getallcorporatepricefactor().subscribe((res: any) => {
      this.corporatepricefactors = res.data;
      this.dtTrigger.next(res.data);
      this.loading = false;
      console.log(this.corporatepricefactors);
    }, (error: any) => {
      this.errorStatus = true;
      this.loading = false;
      this.error = error.error.message;
      console.log(error);
    })
  }
  viewpricefactor(id: number) {
    this.router.navigate(['/corporate/corporatepricefactor/viewpricefactor/', id]);
  }
  addpricefactor() {
    this.router.navigate(['/corporate/corporatepricefactor/viewpricefactor/',0]);
  }

  getCommoditiesNameBYId(id: number) {
    let commodityName = this.commodities.find((commodity: any) => commodity.id == id);
    return commodityName?.name;
  }
  getCorporationNameBYId(id: number) {
    let corporationName = this.Corporation.find((corporation: any) => corporation.id == id);
    return corporationName?.name;
  }
  getUnitsNameBYId(id: number) {
    let unitName = this.units.find((unit: any) => unit.id == id);
    return unitName?.name;
  }

}
