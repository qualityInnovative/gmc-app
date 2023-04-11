import { Component, OnInit } from '@angular/core';
import { Mandi } from 'src/app/ratelist-models';
import { Commodity } from 'src/app/ratelist-models';
import { Unit } from 'src/app/ratelist-models';
import { Mandicommoditypricing } from 'src/app/ratelist-models';
import { faEdit, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { CommoditiesService } from 'src/app/ratelist-services';
import { Apiresponse } from 'src/app/ratelist-models';
import { Router, ActivatedRoute } from '@angular/router';
import { MandicommoditypricingService } from 'src/app/services/mandicommoditypricing/mandicommoditypricing.service';
import { UnitsService } from 'src/app/ratelist-services';
import { Location } from '@angular/common';
import { UserService } from 'src/app/ratelist-services';
import { UserProfile } from 'src/app/ratelist-models';
import { RetailratelistService } from 'src/app/services/retailratelist/retailratelist.service';

// toaster service

@Component({
  selector: 'ratelist-addeditmandicommoditypricing',
  templateUrl: './addeditmandicommoditypricing.component.html',
  styleUrls: ['./addeditmandicommoditypricing.component.scss']
})
export class AddeditmandicommoditypricingComponent implements OnInit {
  loading = false;
  edit: boolean = false;
  faEdit = faEdit;
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  mandis: Mandi[] = [];
  commodities: Commodity[] = [];
  units: Unit[] = [];
  mandiId: number = 0;
  userProfile: UserProfile = new UserProfile();
  mandicommoditypricing: Mandicommoditypricing = new Mandicommoditypricing();
  mandicommoditypricingId: number = 0;
  loggedInUserId: number = 0;
  loggedInUserMandiId: number = 0;
  wouldberetailerprice: number = 0;
  // district rate configuration

  mandiRateFactor: number = 0;
  commodityId: number = 0;
  unitId: number = 0;
  districtId: number = 0;
  changeRetailprice:number=0

  constructor(
    private commoditiesService: CommoditiesService,
    private router: Router,
    private route: ActivatedRoute,
    private mandicommoditypricingservice: MandicommoditypricingService,
    private unitService: UnitsService,
    private location: Location,
    private userService: UserService,
    private retailratelistservice: RetailratelistService
  ) {
    this.route.params.subscribe(params => {
      this.mandicommoditypricingId = params['id'];
      if (this.mandicommoditypricingId > 0) {
        this.edit = true;
      }
      else {
        this.edit = false;
      }
    });
  }
  ngOnInit(): void {
    this.getUserProfile();
    this.getCommodities();
    this.getUnits();
    if (this.edit) {
      this.getMandiCommodityPricing(this.mandicommoditypricingId);
      
      
    }
  }
  onCheckboxChange(event: any) {
    if (event) {
      console.log('checked', event)
      this.mandicommoditypricing.isApproved = true;
      this.mandicommoditypricing.approvedUserId = this.loggedInUserId;
    } else {
      console.log('unchecked', event)
      this.mandicommoditypricing.isApproved = false;
      this.mandicommoditypricing.approvedUserId = 0;
    }
  }
  getUserProfile() {
    this.userService.getUserProfile().subscribe(
      (data: Apiresponse) => {
        console.log(data.data.Profile.mandiId);
        this.mandiId = data.data.Profile.mandiId;
        this.districtId = data.data.Profile.districtId;
        this.loggedInUserId = data.data.Profile.userId;
      },
      (error) => {
        console.log(error);
      })

  }
  onPriceChange(event: any) {
    console.log(event)
    console.log(this.mandicommoditypricing.price,this.mandiRateFactor,this.mandicommoditypricing.retailPrice)
    this.changeRetailprice= this.mandicommoditypricing.price;
    this.changeRetailprice = Number(Number(this.changeRetailprice * Number(this.mandiRateFactor)) + this.changeRetailprice)
    this.mandicommoditypricing.retailPrice = this.changeRetailprice; 
    console.log(this.changeRetailprice)
  }
  onCommodityChange(event: any) {
    this.mandicommoditypricing.commodityId = event;
    this.commodityId = event;
  }
  onUnitChange(event: any) {
    this.mandicommoditypricing.unitId = event;
    this.unitId = event;
    this.getDistrictRateConfiguration(this.commodityId, this.mandiId, this.unitId, this.districtId);
  }
  getDistrictRateConfiguration(commodityId: number, mandiId: number, unitId: number, districtId: number) {
    console.log(commodityId, mandiId, unitId, this.districtId)
    this.retailratelistservice.getRetailandMandiPrice(commodityId, mandiId, unitId, this.districtId).subscribe((res: Apiresponse) => {
      console.log(res.data)
      this.mandiRateFactor = res.data.retailPriceFactor;
    
    }
    )

  }
  getMandiCommodityPricing(id: number) {
    this.mandicommoditypricingservice.getMandiCommodityPricingById(id
    ).subscribe((res: Apiresponse) => {
      console.log(res.data)
      console.log(this.mandicommoditypricing)
      this.mandicommoditypricing = res.data;
      this.mandicommoditypricing.effectiveStartDate= new Date(this.mandicommoditypricing.effectiveStartDate).toISOString().slice(0,10);
      this.mandicommoditypricing.effectiveEndDate= new Date(this.mandicommoditypricing.effectiveEndDate).toISOString().slice(0,10);
      console.log("dates ",
        this.mandicommoditypricing.effectiveStartDate,
        this.mandicommoditypricing.effectiveEndDate
      )
      this.getDistrictRateConfiguration(
        //this.commodityId, this.mandiId, this.unitId, this.districtId
        this.mandicommoditypricing.commodityId,
        this.mandicommoditypricing.mandiId,
        this.mandicommoditypricing.unitId,
        this.districtId
        );
    })
  }

  getUnits() {
    this.unitService.getUnits().subscribe((res: Apiresponse) => {
      this.units = res.data;
    })
  }
  save() {
    this.mandicommoditypricing.mandiId = this.mandiId;
    this.mandicommoditypricing.createdBy = this.loggedInUserId;
    // check all fields are not empty
    if (this.mandicommoditypricing.price === 0) {
      alert("Please enter price");
      return
    }
    if (this.mandicommoditypricing.commodityId == 0) {
      alert("Please select commodity");
      return
    }
    if (this.mandicommoditypricing.unitId == 0) {
      alert('Please select a commodity')
      return
    }

    if (this.edit) {
      console.log('edit', this.mandicommoditypricing)
      this.mandicommoditypricingservice.updateMandiCommodityPricing(this.mandicommoditypricing)
        .subscribe((res: Apiresponse) => {
          if (res.success) {
            alert('Mandi Commodity Pricing updated successfully')
            this.back();
          }
        })
    } else {
      this.mandicommoditypricingservice.saveMandiCommodityPricing(this.mandicommoditypricing)
        .subscribe((res: Apiresponse) => {
          if (res.success) {
            alert('Mandi Commodity Pricing saved successfully');
            this.back();
          }
        })
    }
  }
  back() {
    this.location.back();
  }
  getCommodities() {
    this.commoditiesService.getAllCommodities()
      .subscribe((data: Apiresponse) => {
        if (data.success) {
          this.commodities = data.data;
        }
      });
  }

}
