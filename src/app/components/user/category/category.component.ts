import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommoditiesService } from 'src/app/ratelist-services';
import { Subject } from 'rxjs';
import { UserService, StatesService, DistrictsService, TehsilService } from 'src/app/ratelist-services';
import { RatelistService } from 'src/app/services/ratelist/ratelist.service';
import { Apiresponse, Commodity, State, District, Tehsil, RateList, UserProfile } from 'src/app/ratelist-models';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { faEdit, faSave, faEye } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'ratelist-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  faEdit = faEdit;
  faSave = faSave;
  faEye = faEye;
  //////
  userProfile: UserProfile = new UserProfile();
  loggedinUserId: number = 0;
  assignedStateId: number = 0;
  assignedDistrictId: number = 0;
  state: State = new State();
  district: District = new District();
  tehsils: Tehsil[] = [];
  tehsil: Tehsil = new Tehsil();
  ///////
  categories: Category[] = [];
  commodities: Commodity[] = [];
  commodityId: number = 0;
  loading: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  categoryName: string = "";
  rateList: RateList = new RateList();
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings = {};
  selecteditem: number = 0;
  commodityAndRateList: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private commodityService: CommoditiesService,
    private userService: UserService,
    private statesService: StatesService,
    private districtsService: DistrictsService,
    private tehsilService: TehsilService,
    private ratelistservice: RatelistService,
    private router: Router,
  ) {
  }
  ngOnInit(): void {
    this.getUserProfile();
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
    this.route.params.subscribe(params => {
      this.commodityId = params['commodityId'];
      this.getCommmodityById();
    });
    this.route.queryParams.subscribe(params => {
      this.categoryName = params['category'];
    }
    );
  }
  getCommmodityById() {
    this.loading = true;
    this.commodityService.getCommoditiesByCategory(this.commodityId).subscribe((data: Apiresponse) => {
      if (data.success) {
        this.commodities = data.data;
        this.commodityAndRateList = data.data.map((item: any) => {
          return {
            id: item.id,
            name: item.name,
            rateList: new RateList()
          }
        })
        console.log(this.commodityAndRateList);
        this.loading = false;
      } else {
        this.loading = false;
        this.commodities = [];
      }
    }, (error) => {
      this.loading = false;
      this.commodities = [];
      console.log(error);
    });
  }
  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
    this.selectedItems.push(item);
  }
  onSelectAll(items: any) {
    console.log(items);
    this.selectedItems = items;
  }
  view(id: number) {
    this.router.navigate(['/ratelist', id]);
  }
  goBack() {
    this.location.back();
  }
  addRateList(id: number) {
    if(this.selecteditem == id){
      this.selecteditem = 0;
      return;
    }
    
    this.selecteditem = id;
    console.log(this.selecteditem);
  }
  save(id: number) {
    console.log(id);
    const rateList = this.commodityAndRateList.find((item: any) => item.id === id);
    rateList.rateList.commodityId = id;
    const rateListObj: RateList = rateList.rateList;
    // assign rateList to commodity
    console.log('ratee list', rateListObj);
    if (rateListObj.effectiveEndDate == undefined || rateListObj.effectiveStartDate == rateListObj.effectiveEndDate) {
      alert('Please select effective end date');
      return
    } if (rateListObj.effectiveStartDate == undefined) {
      alert('Please select effective start date');
      return
    } if (rateListObj.price == 0) {
      alert('Please enter rate');
      return
    } if (rateListObj.effectiveEndDate != undefined && rateListObj.effectiveStartDate != undefined && rateListObj.price != undefined) {
      this.ratelistservice.addRateListfromMain(rateListObj).subscribe((data: Apiresponse) => {
        if (data.success) {
          alert('Rate list added successfully');
          this.selecteditem = 0;
        } else {
          alert('Error while adding rate list');
        }
      }, (error) => {
        console.log(error);
      });
    }
  }
  getUserProfile() {
    this.userService.getUserProfile().subscribe((data: Apiresponse) => {
      this.userProfile = data.data;
      this.assignedStateId = this.userProfile.AssignedDistrict.stateId;
      this.assignedDistrictId = this.userProfile.AssignedDistrict.districtId;
      this.getStateById();
      console.log(this.assignedStateId);
      console.log(this.assignedDistrictId);
      this.getDistrictById();
      this.getTehsilsByDistrictId();
    }, (error) => {
      console.log(error);
    });
  }
  getTehsilsByDistrictId() {
    this.tehsilService.admingettehsilsfordistrict(this.assignedDistrictId).subscribe((data: Apiresponse) => {
      this.tehsils = data.data;
      console.log(this.tehsils);
    }, (error) => {
      console.log(error);
    });
  }
  getDistrictById() {
    this.districtsService.admingetDistrictById(this.assignedDistrictId).subscribe((data: Apiresponse) => {
      this.district = data.data;
    }, (error) => {
      console.log(error);
    });
  }
  getStateById() {
    this.statesService.admingetStateById(this.assignedStateId).subscribe((data: Apiresponse) => {
      this.state = data.data;
    }, (error) => {
      console.log(error);
    });
  }




}
