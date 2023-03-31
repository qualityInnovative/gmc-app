import { Component, OnInit } from '@angular/core';
import { Apiresponse, Category, UserProfile, User, State, District, Tehsil } from 'src/app/ratelist-models';
import { CategoryService, UserService, LoginService, StatesService, DistrictsService } from 'src/app/ratelist-services';
import { RateList } from 'src/app/ratelist-models';
import { RatelistService } from 'src/app/services/ratelist/ratelist.service';
import { TehsilService } from 'src/app/ratelist-services';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'ratelist-userratelistdashboard',
  templateUrl: './userratelistdashboard.component.html',
  styleUrls: ['./userratelistdashboard.component.scss']
})
export class UserratelistdashboardComponent implements OnInit {
  loading = false;
  categories: Category[] = [];
  userProfile: UserProfile = new UserProfile();
  userAssignedDistrict: number = 0;
  userAssignedState: number = 0;
  userId: number = 0;
  state: State = new State();
  district: District = new District();
  tehsils: Tehsil[] = [];
  selectedCategory: Category = new Category();
  ratelist: any[] = [];
  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private userService: UserService,
    private loginService: LoginService,
    private statesService: StatesService,
    private districtsService: DistrictsService,
    private rateListService: RatelistService,
    private tehsilService: TehsilService,
  ) {
    this.userId = this.loginService.getLoggedInUser().id;
  }

  ngOnInit(): void {
    this.getUserProfile(this.userId);
  }
  getUserProfile(id: number) {
    this.getAllCategories();
    this.loginService.getUserProfile(id).subscribe((res: Apiresponse) => {
      if (res.success == true) {
        this.userProfile = res.data;
        this.userAssignedDistrict = this.userProfile.AssignedDistrict.districtId
        this.userAssignedState = this.userProfile.AssignedDistrict.stateId
        this.getStateById();
        this.getDistrictById();
        console.log(this.userProfile);
        this.getTehsilsByDistrictId(this.userAssignedDistrict);
      }
    })
  }
  getStateById() {
    this.statesService.admingetStateById(this.userAssignedState).subscribe((data: Apiresponse) => {
      this.state = data.data;
    }, (error) => {
      console.log(error);
    });
  }
  getDistrictById() {
    this.districtsService.admingetDistrictById(this.userAssignedDistrict).subscribe((data: Apiresponse) => {
      this.district = data.data;
    }, (error) => {
      console.log(error);
    });
  }
  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data: Apiresponse) => {
        this.categories = data.data
        this.selectedCategory = this.categories[0];
        console.log(this.categories, this.selectedCategory);
      },
      (error) => {
        this.loading = false;
        this.toastr.error(error.error.message);
      }
    );
  }
  loadingessentials(id: number, stateId: number, districtId: number) {
    console.log(id, stateId, districtId);
    this.rateListService.getRateListByCategory(id, stateId, districtId).subscribe((data: Apiresponse) => {
      this.ratelist = data.data;
      console.log(this.ratelist);
    })
  }
  getTehsilsByDistrictId(id: number) {
    this.tehsilService.admingettehsilsfordistrict(
      id
    ).subscribe((data: Apiresponse) => {
      this.tehsils = data.data;
      console.log(this.tehsils);
    });
  }
  tehsilnamebyid(id: number): string {
    return this.tehsils.find(x => x.id == id).name;
  }

}
