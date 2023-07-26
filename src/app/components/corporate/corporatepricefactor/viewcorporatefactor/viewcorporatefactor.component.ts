import { Component, OnInit } from '@angular/core';
import { Corporatepricefactor } from 'src/app/models/corporationdiscountfactor';
import { Router } from '@angular/router';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import { CorporationdiscountfactorService } from 'src/app/services/corporationdiscountfactor/corporationdiscountfactor.service';
import { ActivatedRoute } from '@angular/router';
import { State } from 'src/app/ratelist-models';
import { District } from 'src/app/ratelist-models';
import { Commodity } from 'src/app/ratelist-models';
import { Unit } from 'src/app/ratelist-models';
import { Corporation } from 'src/app/models/corporation';
import { StatesService } from 'src/app/ratelist-services';
import { DistrictsService } from 'src/app/ratelist-services';
import { CommoditiesService } from 'src/app/ratelist-services';
import { UnitsService } from 'src/app/ratelist-services';
import { CorporationService } from 'src/app/services/corporation/corporation.service';
import { User } from 'src/app/ratelist-models';
import { LoginService } from 'src/app/ratelist-services';
@Component({
  selector: 'ratelist-viewcorporatefactor',
  templateUrl: './viewcorporatefactor.component.html',
  styleUrls: ['./viewcorporatefactor.component.scss']
})
export class ViewcorporatefactorComponent implements OnInit {
  edit: boolean = false;
  faEye = faEye;
  state: State[] = [];
  districts: District[] = [];
  commodities: Commodity[] = [];
  units: Unit[] = [];
  corporations: Corporation[] = [];
  User: User= new User();
  corporateId: number = 0;

  corporatepricefactor: Corporatepricefactor = new Corporatepricefactor();

  constructor(
    public corporationdiscountService: CorporationdiscountfactorService,
    public router: Router,
    public route: ActivatedRoute,
    public stateService: StatesService,
    public districtService: DistrictsService,
    public commodityService: CommoditiesService,
    public unitService: UnitsService,
    public corporationservice: CorporationService,
    public loginservice: LoginService
  ) { 
    this.route.params.subscribe(params => {
      if(params['id'] != undefined && params['id'] != null && params['id'] != '0') {
        this.getcorporatepricefactor(params['id']);
        this.edit = true;
      }
    });
    this.User = this.loginservice.getLoggedInUser();
    this.corporatepricefactor.createdBy = this.User.id;
    this.corporatepricefactor.corporationId = this.User.CorporationId;
  }

  ngOnInit(): void {
    this.getStates();
    this.getDistricts();
    this.getCommodities();
    this.getUnits();
    this.gelAllCorporations();
  }

  gelAllCorporations() {
    this.corporationservice.getCorporations().subscribe((res: any) => {
      this.corporations = res.data;
      console.log(this.corporations);
    }, (error: any) => {
      console.log(error);
    })
  }

  getStates() {
    this.stateService.admingetStates().subscribe((res: any) => {
      this.state = res.data;
      console.log(this.state);
    }, (error: any) => {
      console.log(error);
    })
  }
  getDistricts() {
    this.districtService.admingetDistricts().subscribe((res: any) => {
      this.districts = res.data;
      console.log(this.districts);
    }, (error: any) => {
      console.log(error);
    })
  }
  getCommodities() {
    this.commodityService.getAllCommodities().subscribe((res: any) => {
      this.commodities = res.data;
      console.log(this.commodities);
    }, (error: any) => {
      console.log(error);
    })
  }
  getUnits() {
    this.unitService.getUnits().subscribe((res: any) => {
      this.units = res.data;
      console.log(this.units);
    }, (error: any) => {
      console.log(error);
    })
  }

  getcorporatepricefactor(id: number) {
    this.corporationdiscountService.getcorporatepricefactor(id).subscribe((res: any) => {
      this.corporatepricefactor = res.data;
      console.log(this.corporatepricefactor);
    }, (error: any) => {
      console.log(error);
    })
  }
  addorupdatecorporatepricefactor() {
    console.log(this.corporatepricefactor);
    if (this.edit) {
      this.corporationdiscountService.updatecorporatepricefactor(this.corporatepricefactor).subscribe((res: any) => {
        console.log(res);
        this.router.navigate(['/corporate/corporatepricefactor']);
      }, (error: any) => {
        console.log(error);
      })
    } else {
      this.corporationdiscountService.addcorporatepricefactor(this.corporatepricefactor).subscribe((res: any) => {
        console.log(res);
        this.router.navigate(['/corporate/corporatepricefactor']);
      }, (error: any) => {
        console.log(error);
      })
    }
  }
  back(){
    this.router.navigate(['/corporate/corporatepricefactor']);
  }
  unitSelected(Event: any) {
    this.corporatepricefactor.unitId = Event.target.value;
  }
  commoditySelected(Event: any) {
    this.corporatepricefactor.commodityId = Event.target.value;
  }
  districtSelected(Event: any) {
    this.corporatepricefactor.districtId = Event.target.value;
  }
  corporationSelected(Event: any) {
    this.corporatepricefactor.corporationId = Event.target.value;
  }


}
