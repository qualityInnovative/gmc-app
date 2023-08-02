import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CorporateDiscount, Unit } from 'src/app/ratelist-models';
import { User } from 'src/app/ratelist-models';
import { CorporatecommoditiesService } from 'src/app/services/corporatecommodities/corporatecommodities.service';
import { CorporationCommodity } from 'src/app/models/corporationcommodity';
import { UserService } from 'src/app/ratelist-services';
import { UnitsService } from 'src/app/ratelist-services';
import { CorporatediscountService } from 'src/app/services/corporatediscount/corporatediscount.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ratelist-viewaddcommoditydiscount',
  templateUrl: './viewaddcommoditydiscount.component.html',
  styleUrls: ['./viewaddcommoditydiscount.component.scss']
})
export class ViewaddcommoditydiscountComponent implements OnInit {
  user: User = new User();
  corporateId:number=0;
  loading = false;
  errorStatus:number=0;
  error = '';
  edit:boolean=false;
  corporateCommodities:CorporationCommodity[] = [];
  corporateDiscount:CorporateDiscount=new CorporateDiscount();
  corporateDiscountvalues:number[]=[];
  units:Unit[]=[];
  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private userService: UserService,
    private corporatecommoditiesService: CorporatecommoditiesService,
    private unitService: UnitsService,
    private corporatediscountService: CorporatediscountService,
    private toastr: ToastrService
  ) {
      this.user = this.userService.getCurrentUser();
      this.corporateId=this.user.CorporationId;
      this.corporateDiscountvalues=Array(100).fill(0).map((x,i)=>i);
   }
  ngOnInit(): void {
    this.isEdit();
    this.getallcorporatecommoditiesbycorporateidwithoutimages(this.corporateId);
    
  }
  getallcorporatecommoditiesbycorporateidwithoutimages(corporateid:number){
    this.loading=true;
    this.corporatecommoditiesService.getallcorporatecommoditiesbycorporateidwithoutimages(corporateid)
    .subscribe(response=>{
      this.loading=false;
      if(response.success){
        this.corporateCommodities=response.data;
        this.getallunits();
      }
      else{
        this.error=response.message;
        console.log(this.error);
      }
    })
  }
  getallunits(){
    this.loading=true;
    this.unitService.getUnits()
    .subscribe(response=>{
      this.loading=false;
      if(response.success){
        this.units=response.data;
      }
      else{
        this.error=response.message;
      } 
    })
  }
  isEdit(){
    this.route.params.subscribe(params => {
      if(params['id'] > 0){
        this.edit=true;
        console.log(params['id']);
        this.getCorporateDiscountById(params['id']);
      }
      else{
        this.edit=false;
        
      }
    });
  }
  getCorporateDiscountById(id:number){
    this.corporatediscountService
    .getcorporatediscountbyid(id)
    .subscribe(response=>{
      if(response.success){
        this.corporateDiscount=response.data;
        console.log(this.corporateDiscount);
      }
      else{
        this.error=response.message;
      }
    })
  }
  
  back(){
    this._location.back();
  }
  update(){
    this.corporateDiscount.corporationId=this.corporateId;
    this.corporateDiscount.createdBy=this.user.id;
    if(this.corporateDiscount.corporationCommodityId==0){
      this.toastr.error("Please select commodity");
      return;
    }
    if(this.corporateDiscount.discount==0){
      this.toastr.error("Please select discount");
      return;
    }
    this.corporatediscountService
    .updatecorporatediscount(this.corporateDiscount)
    .subscribe(response=>{
      if(response.success){
        this.toastr.success(response.message);
        this._location.back();
      }
      else{
        this.toastr.error(response.message);
      }
    }
    )
  }
  save(){
    this.corporateDiscount.corporationId=this.corporateId;
    this.corporateDiscount.createdBy=this.user.id;
    if(this.corporateDiscount.corporationCommodityId==0){
      this.toastr.error("Please select commodity");
      return;
    }
    if(this.corporateDiscount.discount==0){
      this.toastr.error("Please select discount");
      return;
    }
    this.corporatediscountService
    .savecorporatediscount(this.corporateDiscount)
    .subscribe(response=>{
      if(response.success){
        this.toastr.success(response.message);
        this._location.back();
      }
      else{
        this.toastr.error(response.message);
      }
    }
    )
  }
  getUnitName(id:number){
    return this.units.find(x=>x.id==id)?.name;
  }
}
