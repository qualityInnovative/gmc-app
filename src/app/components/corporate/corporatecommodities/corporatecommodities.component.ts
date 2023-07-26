import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CorporationCommodity } from 'src/app/models/corporationcommodity';
import { CorporatecommoditiesService } from 'src/app/services/corporatecommodities/corporatecommodities.service';
import { Unit } from 'src/app/ratelist-models';
import { UnitsService } from 'src/app/ratelist-services';
import { Corporation } from 'src/app/models/corporation';
import { CorporationService } from 'src/app/services/corporation/corporation.service';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'ratelist-corporatecommodities',
  templateUrl: './corporatecommodities.component.html',
  styleUrls: ['./corporatecommodities.component.scss']
})
export class CorporatecommoditiesComponent implements OnInit {
  faEye = faEye;
  loading:boolean=false;
  errorStatus:number=0;
  error : string = "";
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  corporationcommodities:CorporationCommodity[]=[];
  units:Unit[]=[];
  corporations:Corporation[]=[];
  constructor(
    private corporatecommoditiesService:CorporatecommoditiesService,
    private unitsService:UnitsService,
    private corporationsService:CorporationService,
    private router:Router
  ) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.getcorporatecommodities();
    this.getallunits();
  }
  getallunits(){
    this.loading=true;
    this.unitsService.
    getUnits()
    .subscribe(response=>{
      this.loading=false;
      if(response.success){
        this.units=response.data;
      }
      else{
        this.error=response.message;
        console.log(this.error);
      }
    })
  }
  getcorporatecommodities(){
    this.loading=true;
    this.corporatecommoditiesService.getcorporatecommodities()
    .subscribe(response=>{
      this.loading=false;
      if(response.success){
        this.corporationcommodities=response.data;
        this.dtTrigger.next(undefined);
      }
      else{
        this.error=response.message;
        console.log(this.error);
      }
    })
  }
  addcorporatecommodity(){
    this.router.navigate(['corporate/viewcorporatecommodities',0]);
  }
  getCorporationNameBYId(id:number):string{
    return this.corporations.find(x=>x.id==id)?.name || "";
  }
  getUnitsNameBYId(id:number):string{
    return this.units.find(x=>x.id==id)?.name || "";
  }
  viewcorporatecommodity(id:number){
    this.router.navigate(['corporate/viewcorporatecommodities',id]);
  }
}
