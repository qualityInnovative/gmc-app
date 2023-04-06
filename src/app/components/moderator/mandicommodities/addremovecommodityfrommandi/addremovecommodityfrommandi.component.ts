import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commodity } from 'src/app/ratelist-models';
import { MandicommoditiesService } from 'src/app/services/mandicommodities/mandicommodities.service';
import { MandiService } from 'src/app/services/mandi/mandi.service';
import { ActivatedRoute } from '@angular/router';
import { CommoditiesService } from 'src/app/ratelist-services';
import { MandiCommodity } from 'src/app/ratelist-models';
import { Location } from '@angular/common';
import { Apiresponse } from 'src/app/ratelist-models';
import { UserService } from 'src/app/ratelist-services';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'ratelist-addremovecommodityfrommandi',
  templateUrl: './addremovecommodityfrommandi.component.html',
  styleUrls: ['./addremovecommodityfrommandi.component.scss']
})
export class AddremovecommodityfrommandiComponent implements OnInit {
  edit: boolean = false;
  mandiCommodityId: number = 0;
  commodities: Commodity[] = [];
  mandiCommodity: MandiCommodity = new MandiCommodity();
  adminMandiId: number = 0;
  constructor(
    private router: Router,
    private mandicommoditiesService: MandicommoditiesService,
    private route: ActivatedRoute,
    private mandiService: MandiService,
    private commodityservice: CommoditiesService,
    private location: Location,
    private userService: UserService,
    private toastr: ToastrService

  ) {
    this.route.params.subscribe(params => {
      if (params['id'] != 0) {
        this.edit = true;
        this.mandiCommodityId = params['id'];
      }
    });
  }
  ngOnInit(): void {
    this.isEdit();
    this.getUserProfile();
    this.getAllCommodities();
  }
  isEdit() {
    if (this.edit) {

    }
  }
  getUserProfile() {
    this.userService.getUserProfile().subscribe(
      (data: Apiresponse) => {
        console.log(data.data.Profile.mandiId);
        this.getCommodityForMandi(data.data.Profile.mandiId);
        this.adminMandiId = data.data.Profile.mandiId;
      },
      (error) => {
        console.log(error);
      })
  }
  getCommodityForMandi(mandiCommodityId: number) {
    console.log(mandiCommodityId);
  }
  getAllCommodities() {
    this.commodityservice.getAllCommodities().subscribe(
      (data: any) => {
        console.log(data);
        this.commodities = data.data;
      },
      (error) => {
        console.log(error);
      })
  }
  onSubmit() {
    if (this.mandiCommodity.commodityId == 0) {
      this.toastr.error('Please select commodity');
      return;
    }
    this.mandiCommodity.mandiId = this.adminMandiId;
    console.log(this.mandiCommodity);
    this.mandicommoditiesService.checkMandiCommodity(this.mandiCommodity).subscribe(
      (data: Apiresponse) => {
        console.log(data.success);
        if (data.success === true) {
          this.mandicommoditiesService.addMandiCommodity(this.mandiCommodity).subscribe(
            (data: any) => {
              console.log(data);
              this.toastr.success('Commodity added successfully');
              this.back();
            },
            (error) => {
              console.log(error);
            })
        }
        else {
          this.toastr.error('Commodity already exist');
        }
      }
    )
  }
  back() {
    this.location.back();
  }
}
