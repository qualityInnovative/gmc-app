// import { Component, OnInit } from '@angular/core';
// import { Location } from '@angular/common';
// import { RetailRateList } from 'src/app/models/retailRateList';
// import { RetailratelistService } from 'src/app/services/retailratelist/retailratelist.service';
// import { Apiresponse } from 'src/app/ratelist-models';
// import { Commodity } from 'src/app/models/commodity';
// import { District } from 'src/app/models/district';
// import { Mandi } from 'src/app/models/mandi';
// import { Unit } from 'src/app/models/unit';
// import { CommoditiesService } from 'src/app/ratelist-services';
// import { DistrictsService } from 'src/app/ratelist-services';
// import { MandiService } from 'src/app/services/mandi/mandi.service';
// import { UnitsService } from 'src/app/ratelist-services';
// import { LoginService } from 'src/app/ratelist-services';
// import { Router, ActivatedRoute } from '@angular/router';
// import { Subject } from 'rxjs';
// import { UserProfile } from 'src/app/ratelist-models';
// import { UserService } from 'src/app/ratelist-services';
// import {faPenToSquare,faTrash} from '@fortawesome/free-solid-svg-icons';
// @Component({
//   selector: 'ratelist-departmentretailrate',
//   templateUrl: './departmentretailrate.component.html',
//   styleUrls: ['./departmentretailrate.component.scss']
// })
// export class  implements OnInit {
//   edit: boolean = false;
//   retailratelist: RetailRateList = new RetailRateList();
//   retailratelistId: number = 0;
//   loading = false;
//   errorStatus = false;
//   error = '';

//   selectedCommodityId: number = 0;
//   selectedDistrictId: number = 0;
//   selectedMandiId: number = 0;
//   selectedUnitId: number = 0;
//   commodities: Commodity[] = [];
//   districts: District[] = [];
//   mandis: Mandi[] = [];
//   units: Unit[] = [];
//   user: UserProfile = new UserProfile();
//   mandiId: number = 0;
//   loggedInUserId: number = 0;
//   dtOptions: DataTables.Settings = {};
//   dtTrigger: Subject<any> = new Subject();

//   constructor(
//     private location: Location,
//     private retailratelistService: RetailratelistService,
//     private router: Router,
//     private route: ActivatedRoute,
//     private commoditiesService: CommoditiesService,
//     private mandiService: MandiService,
//     private districtsService: DistrictsService,
//     private unitsService: UnitsService,
//     private loginService: LoginService,
//     private userService: UserService
//   ) {
//     this.route.params.subscribe(params => {
//       this.retailratelistId = params['id'];
//     });
//   }

//   ngOnInit(): void {
//     this.getUserProfile();
//     this.getAllCommodities();
//     this.getAllDistricts();
//     this.getAllUnits();
//     this.isEdit();
//   }
//   isEdit() {
//     if (this.retailratelistId > 0) {
//       this.edit = true;
//       this.getRetailRateListById(this.retailratelistId);
//     } else {
//       this.edit = false;
//     }
//   }
//   getRetailRateListById(id: number) {
//     this.retailratelistService.getRetailRateListById(id)
//       .subscribe((res: Apiresponse) => {
//         this.retailratelist = res.data;
//         console.log(this.retailratelist);
//       });
//   }
//   getUserProfile() {
//     this.userService.getUserProfile().subscribe(
//       (data: Apiresponse) => {

//         this.mandiId = data.data.Profile.mandiId;
//         this.loggedInUserId = data.data.Profile.userId;
//         console.log(this.mandiId, this.loggedInUserId);
//       },
//       (error) => {
//         console.log(error);
//       })
//   }
//   addRetailRateList() {



//   back(): void { this.location.back(); }
//   getAllCommodities() {
//     this.commoditiesService.getAllCommodities()
//       .subscribe((res: Apiresponse) => {
//         this.commodities = res.data;
//         console.log(this.commodities);
//       });
//   }
//   getAllDistricts() {
//     this.districtsService.getAllDistricts()
//       .subscribe((res: Apiresponse) => {
//         this.districts = res.data;
//         console.log(this.districts);
//       });
//   }
//   getAllUnits() {
//     this.unitsService.getUnits()
//       .subscribe((res: Apiresponse) => {
//         this.units = res.data;
//         console.log(this.units);

//       });
//   }
//   commoditySelected(event: HTMLSelectElement | any) {
//     console.log(event.target.value);
//     this.selectedCommodityId = event.target.value;
//   }
//   districtSelected(event: HTMLSelectElement | any) {
//     console.log(event.target.value);
//     this.selectedDistrictId = event.target.value;
//   }
//   unitSelected(event: HTMLSelectElement | any) {
//     this.selectedUnitId = event.target.value;
//     console.log(event.target.value);
//     this.getRetailandMandiPrice(
//       this.selectedCommodityId,
//       this.selectedDistrictId,
//       this.mandiId,
//       this.selectedUnitId
//     )
//   }
//   getRetailandMandiPrice(commodityId: number, districtId: number, mandiId: number, unitId: number) {
//     if (commodityId == 0 || districtId == 0 || mandiId == 0 || unitId == 0) {
//       return;
//     }
//     this.retailratelistService.getRetailandMandiPrice(
//       commodityId,
//       districtId,
//       mandiId,
//       unitId
//     )
//       .subscribe((res: Apiresponse) => {
//         this.retailratelist.mandiPrice = res.data.mandiPrice;
//         this.retailratelist.retailPrice = (this.retailratelist.mandiPrice * res.data.retailPriceFactor) + this.retailratelist.mandiPrice;
//         console.log(this.retailratelist);
//       });
//   }
//   saveRateList() {
//     if (this.edit) {
//       console.log(this.retailratelist);
//       this.retailratelistService.
//         updateRetailRateList(this.retailratelistId, this.retailratelist).
//         subscribe((res: Apiresponse) => {
//           console.log(res);
//         });
//     } else {
//       console.log(this.retailratelist);
//       this.retailratelist.approvedByUserId = this.loginService.getLoggedInUser().id;
//       this.retailratelist.createdBy = this.loginService.getLoggedInUser().id;
//       this.retailratelistService.saveRetailRateList(this.retailratelist)
//         .subscribe((res: Apiresponse) => {
//           console.log(res)
//         });
//     }
//   }


// }


import { Component, OnInit } from '@angular/core';
import { RetailratelistService } from 'src/app/services/retailratelist/retailratelist.service';
import { RetailRateList } from 'src/app/models/retailRateList';
import { Apiresponse } from 'src/app/ratelist-models';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import { UserProfile } from 'src/app/ratelist-models';
import { UserService } from 'src/app/ratelist-services';
import {RetailRate} from 'src/app/models/retailrate';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'ratelist-departmentretailrate',
  templateUrl: './departmentretailrate.component.html',
  styleUrls: ['./departmentretailrate.component.scss']
})
export class DepartmentretailrateComponent implements OnInit {
  retailratelist: RetailRate[] = [];
  loading = false;
  errorStatus = false;
  error = '';
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  user: UserProfile= new UserProfile();
  userMandiId: number = 0;
  constructor(
    private retailratelistService: RetailratelistService,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getUser();
  }
  getUser(): void {
    this.userService.getUserProfile().subscribe(
      (data:Apiresponse) => {
        this.user = data.data;
        this.userMandiId = this.user.Profile.mandiId;
        this.getRetailRateList(this.userMandiId);
      },
      error => {
        this.error = error;
        this.errorStatus = true;
      });
  }
  getRetailRateList(mandiId: number): void {
    this.loading = true;
    this.retailratelistService.getModeratorRetailRateList(mandiId).subscribe(
      (data: Apiresponse) => {
        // sort by created date
        this.retailratelist = data.data.filter((item:any)=>item.createdAt != null).sort((a:any,b:any)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.dtTrigger.next(this.retailratelist);
        this.loading = false;
        console.log(this.retailratelist);
      },
      error => {
        this.error = error;
        this.errorStatus = true;
        this.loading = false;
      }
    );
  }
  moderatoraddratelist(): void {
    // department/retailratelist/deparmentaddretailrate/:id
    this.router.navigate(['department/retailratelist/deparmentaddretailrate',0]);
  }
  editRetailRateList(retailRateListId: number): void {
    //department/retailratelist/deparmentaddretailrate/:id
    this.router.navigate(['department/retailratelist/deparmentaddretailrate',retailRateListId]);
  }
  deleteRetailRateList(retailRateListId: number): void {
    if(confirm("Are you sure to delete this record?")) {
    this.loading = true;
    this.retailratelistService
    .deleteRetailRateList(retailRateListId)
    .subscribe(
      (data: Apiresponse) => {
        this.loading = false;
        this.toastr.success('Retail Rate List Deleted Successfully');
        this.getRetailRateList(this.userMandiId);
      },
      error => {
        this.error = error;
        this.errorStatus = true;
        this.loading = false;
      }
    );
    }else{
      return;
    }
  }
}

// DepartmentretailrateComponent