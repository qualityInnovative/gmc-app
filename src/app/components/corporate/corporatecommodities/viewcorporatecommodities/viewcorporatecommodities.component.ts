import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CorporationCommodity } from 'src/app/models/corporationcommodity';
import { CorporatecommoditiesService } from 'src/app/services/corporatecommodities/corporatecommodities.service';
import { Corporation } from 'src/app/models/corporation';
import { User } from 'src/app/ratelist-models';
import { UserService } from 'src/app/ratelist-services';
@Component({
  selector: 'ratelist-viewcorporatecommodities',
  templateUrl: './viewcorporatecommodities.component.html',
  styleUrls: ['./viewcorporatecommodities.component.scss']
})
export class ViewcorporatecommoditiesComponent implements OnInit {
  edit=false;
  faEye = faEye;
  corporationcommodity:CorporationCommodity=new CorporationCommodity();
  loggedinuser:User = new User();
  corporationId:number=0;
  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private corporatecommoditiesService:CorporatecommoditiesService,
    private userService:UserService
  ) {
    this.loggedinuser = this.userService.getCurrentUser();
    this.corporationId = this.loggedinuser.CorporationId;
   }
  ngOnInit(): void {
    this.isEdit();
  }
  isEdit(){
    this.route.params.subscribe(params => {
      if(params['id'] != undefined || params['id'] != null || params['id'] != 0){
        this.edit = true;
        this.getCoporateCommodity(params['id']);
      }else{
        this.edit = false;
      }
    });
  }
  back(){
    this.location.back();
  }
  getCoporateCommodity(id:number){
    this.corporatecommoditiesService.getCoporateCommodity(id).subscribe(
      (data) => {
        this.corporationcommodity = data.data;
      }
    )
  }
  save(){
    this.corporatecommoditiesService.saveCoporateCommodity(this.corporationcommodity).subscribe(
      (data) => {
        if(data.success){
          this.router.navigate(['/corporation/corporatecommodities']);
        }
      }
    )
  }
  update(){
    this.corporatecommoditiesService.updateCoporateCommodity(this.corporationcommodity).subscribe(
      (data) => {
        if(data.success){
          this.router.navigate(['/corporation/corporatecommodities']);
        }
      }
    )
  }
}
