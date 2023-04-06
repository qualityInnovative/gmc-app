import { Component, OnInit } from '@angular/core';
import { Apiresponse, Category, UserProfile, State, District, Tehsil } from 'src/app/ratelist-models';
import { CategoryService, LoginService } from 'src/app/ratelist-services';
import { ToastrService } from 'ngx-toastr';
import { MandicommoditypricingService } from 'src/app/services/mandicommoditypricing/mandicommoditypricing.service';
import { Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'ratelist-userratelistdashboard',
  templateUrl: './userratelistdashboard.component.html',
  styleUrls: ['./userratelistdashboard.component.scss']
})
export class UserratelistdashboardComponent implements OnInit {
  edit: boolean = false;
  loading = false;
  faEdit = faEdit;
  faTrash = faTrash;
  categories: Category[] = [];
  userProfile: UserProfile = new UserProfile();
  userId: number = 0;
  state: State = new State();
  district: District = new District();
  tehsils: Tehsil[] = [];
  selectedCategory: Category = new Category();
  mandiCommodityPricing: any[] = [];
  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private loginService: LoginService,
    private mandiCommodityPricingService: MandicommoditypricingService,
    private router: Router
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
  loadingessentials(categoryId: number, createdBy: number) {
    console.log(categoryId, createdBy);
    this.mandiCommodityPricingService.getMandiCommodityPricingByCategoryAndUser(categoryId, createdBy).subscribe(
      (data: Apiresponse) => {
        this.mandiCommodityPricing = data.data;
        console.log(this.mandiCommodityPricing);
      }
    );
  }
  editmandirateRate(id: number) {
    console.log(id);
    this.router.navigate(['/mandirate/editmandirate', id]);
  }
  deletemandiRate(id: number) {
    console.log(id);
    if (confirm("Are you sure to delete this record?")) {
      this.mandiCommodityPricingService.deleteMandiCommodityPricing(id).subscribe(
        (data: Apiresponse) => {
          this.toastr.success(data.message);
          this.loadingessentials(this.selectedCategory.id, this.userId);
        },
        (error) => {
          this.toastr.error(error.error.message);
        }
      );
    } else {
      return;
    }
  }
}
