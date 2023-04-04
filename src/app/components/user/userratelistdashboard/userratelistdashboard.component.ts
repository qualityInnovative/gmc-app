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
        console.log(this.userProfile);
      }
    }, (error) => {
      this.toastr.error(error.error.message);
    });
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data: Apiresponse) => {
        this.categories = data.data
        this.selectedCategory = this.categories[0];
        this.loadingessentials(this.selectedCategory.id, this.userId);
        console.log(this.categories, this.selectedCategory);
      },
      (error) => {
        this.loading = false;
        this.toastr.error(error.error.message);
      }
    );
  }
  loadingessentials(id: number, createdBy: number) {
    console.log(id);
    this.rateListService.getRateListByCategoryUser(id, createdBy).subscribe((data: Apiresponse) => {
      this.ratelist = data.data;
      console.log(this.ratelist);
    })
  }
}
