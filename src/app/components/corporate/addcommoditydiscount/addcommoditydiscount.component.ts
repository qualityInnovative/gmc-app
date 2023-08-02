import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { Subject } from 'rxjs';
import {CorporatecommoditiesService} from 'src/app/services/corporatecommodities/corporatecommodities.service';
import {CorporationCommodity} from 'src/app/models/corporationcommodity';
import { CorporateDiscount } from 'src/app/ratelist-models';
import { CorporatediscountService } from 'src/app/services/corporatediscount/corporatediscount.service';
import { User } from 'src/app/ratelist-models';
import { UserService } from 'src/app/ratelist-services';
import {Corporation} from 'src/app/models/corporation';
import {CorporationService} from 'src/app/services/corporation/corporation.service';
@Component({
  selector: 'ratelist-addcommoditydiscount',
  templateUrl: './addcommoditydiscount.component.html',
  styleUrls: ['./addcommoditydiscount.component.scss']
})
export class AddcommoditydiscountComponent implements OnInit {
  loading: boolean = false;
  errorStatus: number = 0;
  error: string = "";
  faEye = faEye;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  corporateCommodities: CorporationCommodity[] = [];
  corporateDiscounts: CorporateDiscount[] = [];
  corporations: Corporation[] = [];
  user: User = new User();
  constructor(
    private router: Router,
    private corporatecommoditiesService: CorporatecommoditiesService,
    private corporatediscountService: CorporatediscountService,
    private userService: UserService,
    private cop: CorporationService
  ) { 
    this.user = this.userService.getCurrentUser();
   
  }
  ngOnInit(): void {
    this.getAllCorporateDiscountByCorporateCommodityId(this.user.CorporationId);
    this.getallcorporations();
    this.getAllCorporateCommoditiesbyCorporationWithoutImages(this.user.CorporationId);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }
  getallcorporations() {
    this.cop
    .getCorporations()
    .subscribe(
      (data) => {
        this.corporations = data.data;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  corporationName(id: number) {
    return this.corporations.find(x => x.id == id)?.name;
  }
 
  getAllCorporateCommoditiesbyCorporationWithoutImages(id: number) {
    this.corporatecommoditiesService
    .getallcorporatecommoditiesbycorporateidwithoutimages(id)
    .subscribe(
      (data) => {
        this.corporateCommodities = data.data;
       
      },
      (err) => {
        this.error = err;
      }
    );
  }
  addcorporatecommoditydiscount() {
    this.router.navigate(['corporate/addcommoditydiscount/viewaddcommoditydiscount',0]);
  }
  viewcorporatecommoditydiscount(id: number) {
    
    this.router.navigate(['corporate/addcommoditydiscount/viewaddcommoditydiscount',id]);
  }
  getAllCorporateDiscountByCorporateCommodityId(id: number) {
    this.corporatediscountService
    .getcorporatediscountsbycorporateid(id)
    .subscribe(
      (data) => {
        this.corporateDiscounts = data.data;
        this.dtTrigger.next(undefined);
        
      },
      (err) => {
        this.error = err;
      }
    );
  }
  getCoporateCommodityName(id: number) {
    return this.corporateCommodities.find(x => x.id == id)?.name;
  }


 
}
