import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminauthGuard } from './gaurds/adminauth/adminauth.guard';
import {ModeratorGaurdGuard} from './gaurds/moderatorGaurd/moderator-gaurd.guard';
import { DeparmentgaurdGuard } from './gaurds/deparmentgaurd/deparmentgaurd.guard';
import { LoginComponent } from './components/user/login/login.component';
import { AdminhomeComponent } from './components/admin/adminhome/adminhome.component';
import { OfflinehomeComponent } from './components/offline/offlinehome/offlinehome.component';
import { AboutusComponent } from './components/offline/aboutus/aboutus.component';
import { ContactusComponent } from './components/offline/contactus/contactus.component';
import { EditstatesComponent } from './components/admin/states/editstates/editstates.component';
import { DistrictsComponent } from './components/admin/districts/districts.component';
import { EditdistrictComponent } from './components/admin/districts/editdistrict/editdistrict.component';
import { TehsilsComponent } from './components/admin/tehsils/tehsils.component';
import { EdittehsilComponent } from './components/admin/tehsils/edittehsil/edittehsil.component';
import { CategoriesComponent } from './components/admin/categories/categories.component';
import { EditcategoryComponent } from './components/admin/categories/editcategory/editcategory.component';
import { UnitsComponent } from './components/admin/units/units.component';
import { EditunitsComponent } from './components/admin/units/editunits/editunits.component';
import { CommoditiesComponent } from './components/admin/commodities/commodities.component';
import { EditcommoditiesComponent } from './components/admin/commodities/editcommodities/editcommodities.component';
import { AuthGuard } from './services/auth/auth.guard';
import { HomeComponent } from './components/user/home/home.component';
import { UserlistComponent } from './components/admin/userlist/userlist.component';
import { EdituserComponent } from './components/admin/userlist/edituser/edituser.component';
import { CategoryComponent } from './components/user/category/category.component';
import { RatelistComponent } from './components/user/ratelist/ratelist.component';
import { MandiComponent } from './components/admin/mandi/mandi.component';
import { EditmandiComponent } from './components/admin/mandi/editmandi/editmandi.component';
import { DistrictrateconfigurationComponent } from './components/admin/districtrateconfiguration/districtrateconfiguration.component';
import { EditdistrictconfigurationComponent } from './components/admin/districtrateconfiguration/editdistrictconfiguration/editdistrictconfiguration.component';
import { MandicommoditypricingComponent } from './components/admin/mandicommoditypricing/mandicommoditypricing.component';
import { EditmandicommoditypricingComponent } from './components/admin/mandicommoditypricing/editmandicommoditypricing/editmandicommoditypricing.component';
import { DeparmentsComponent } from './components/admin/deparments/deparments.component';
import { EditdeparmentComponent } from './components/admin/deparments/editdeparment/editdeparment.component';
import { DesignationComponent } from './components/admin/designation/designation.component';
import { EditdesignationComponent } from './components/admin/designation/editdesignation/editdesignation.component';
import { AdminRetailratelistComponent } from './components/admin/admin-retailratelist/admin-retailratelist.component';
import { EditadminRetailratelistComponent } from './components/admin/admin-retailratelist/editadmin-retailratelist/editadmin-retailratelist.component';
import { EditprofileComponent } from './components/user/editprofile/editprofile.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ResetpasswordComponent } from './components/user/resetpassword/resetpassword.component';
import { ModeratordashboardComponent } from './components/moderator/moderatordashboard/moderatordashboard.component';
import { ModeratorhomeComponent } from './components/moderator/moderatorhome/moderatorhome.component';
import { AdmindashboardComponent } from './components/admin/admindashboard/admindashboard.component';
import { ModeratordistricconfigurationComponent } from './components/moderator/moderatordistricconfiguration/moderatordistricconfiguration.component';
import { ModeratormandicommoditypricingComponent } from './components/moderator/moderatormandicommoditypricing/moderatormandicommoditypricing.component';
import { AddeditmandicommoditypricingComponent } from './components/moderator/moderatormandicommoditypricing/addeditmandicommoditypricing/addeditmandicommoditypricing.component';
import { ModeratormandiusersComponent } from './components/moderator/moderatormandiusers/moderatormandiusers.component';
import { ModeratorretailratelistComponent } from './components/moderator/moderatorretailratelist/moderatorretailratelist.component';
import { MandicommoditiesComponent } from './components/moderator/mandicommodities/mandicommodities.component';
import { AddremovecommodityfrommandiComponent } from './components/moderator/mandicommodities/addremovecommodityfrommandi/addremovecommodityfrommandi.component';
import { AddmoderatorratelistComponent } from './components/moderator/moderatorretailratelist/addmoderatorratelist/addmoderatorratelist.component';
import { MandirateComponent } from './components/user/mandirate/mandirate.component';
import { EditmandirateComponent } from './components/user/mandirate/editmandirate/editmandirate.component';
import { CreatemandiuserComponent } from './components/moderator/moderatormandiusers/createmandiuser/createmandiuser.component';
import { DeparmenthomeComponent } from './components/department/deparmenthome/deparmenthome.component';
import { DepartmentretailrateComponent } from './components/department/departmentretailrate/departmentretailrate.component';
import { DepartmentmandiusersComponent } from './components/department/departmentmandiusers/departmentmandiusers.component';
import { DeparmentaddretailratesComponent } from './components/department/departmentretailrate/deparmentaddretailrates/deparmentaddretailrates.component';
import { EditmandiuserComponent } from './components/department/departmentmandiusers/editmandiuser/editmandiuser.component';
import { CompaintsComponent } from './components/admin/compaints/compaints.component';
import { ComplaintdetailComponent } from './components/admin/compaints/complaintdetail/complaintdetail.component';
import { DeparmentcomplaintsComponent } from './components/department/deparmentcomplaints/deparmentcomplaints.component';
import { ViewcomplaintComponent } from './components/department/deparmentcomplaints/viewcomplaint/viewcomplaint.component';
import { BannersComponent } from './components/admin/banners/banners.component';
import { EditbannerComponent } from './components/admin/banners/editbanner/editbanner.component';
import { UnauthorizedComponent } from './components/misc/unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: '',
    component: OfflinehomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'aboutus',
    component: AboutusComponent,
    pathMatch: 'full'
  },
  {
    path: 'contactus',
    component: ContactusComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'editprofile',
    component: EditprofileComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/states',
    component: AdminhomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'admin/states/editstates/:id',
    component: EditstatesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'admin/districts',
    component: DistrictsComponent,
    pathMatch: 'full'
    , canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'admin/districts/editdistricts/:stateId/:districtId',
    component: EditdistrictComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'admin/tehsils',
    component: TehsilsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'admin/tehsils/edittehsil/:districtId/:tehsilId',
    component: EdittehsilComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'admin/categories',
    component: CategoriesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'admin/categories/editcategory/:categoryId',
    component: EditcategoryComponent,
    pathMatch: 'full'
    ,
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'admin/units',
    component: UnitsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'admin/units/editunit/:unitId',
    component: EditunitsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'admin/commodities/:page',
    component: CommoditiesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'admin/commodities/editcommodity/:commodityId',
    component: EditcommoditiesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/userlist',
    component: UserlistComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'admin/userlist/edituser/:userId',
    component: EdituserComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  }, {
    path: 'category/:commodityId',
    component: CategoryComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'ratelist/:commodityId',
    component: RatelistComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: "mandirate/:commodityId",
    component: MandirateComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'mandirate/editmandirate/:id',
    component: EditmandirateComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]

  },
  {
    path: 'admin/mandi',
    component: MandiComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'admin/mandi/editmandi/:mandiId',
    component: EditmandiComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  }
  ,
  {
    path: 'admin/districtrateconfiguration',
    component: DistrictrateconfigurationComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/districtrateconfiguration/editdistrictconfiguration/:id',
    component: EditdistrictconfigurationComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/mandicommoditypricing',
    component: MandicommoditypricingComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'admin/mandicommoditypricing/editmandicommoditypricing/:id',
    component: EditmandicommoditypricingComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'admin/departments',
    component: DeparmentsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'admin/deparments/editdeparment/:id',
    component: EditdeparmentComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'admin/designation',
    component: DesignationComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'admin/designation/editdesignation/:id',
    component: EditdesignationComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'admin/adminretailratelist',
    component: AdminRetailratelistComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'admin/adminretailratelist/editadminretaillist/:id',
    component: EditadminRetailratelistComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'resetpassword',
    component: ResetpasswordComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'moderator',
    component: ModeratorhomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,ModeratorGaurdGuard]
  },
  {
    path: 'moderator/dashboard',
    component: ModeratordashboardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,ModeratorGaurdGuard]
  },
  {
    path: 'admindashboard',
    component: AdmindashboardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: "moderator/mandicommoditypricing",
    component: ModeratormandicommoditypricingComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,ModeratorGaurdGuard]
  },
  {
    path: "moderator/mandicommoditypricing/editmandicommoditypricing/:id",
    component: AddeditmandicommoditypricingComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,ModeratorGaurdGuard]
  },
  {
    path: "moderator/districtrateconfiguration",
    component: ModeratordistricconfigurationComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard, ModeratorGaurdGuard]

  },
  {
    path: "moderator/retailratelist",
    component: ModeratorretailratelistComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard, ModeratorGaurdGuard]

  },
  {
    path: "moderator/retailratelist/editretailratelist/:id",
    component: AddmoderatorratelistComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard, ModeratorGaurdGuard]
  },
  {
    path: "moderator/mandiusers",
    component: ModeratormandiusersComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard, ModeratorGaurdGuard]
  },
  {
    path: "moderator/mandiusers/editmandiuser/:id",
    component: CreatemandiuserComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard, ModeratorGaurdGuard]
  },
  {
    path: "moderator/mandicommodities",
    component: MandicommoditiesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard, ModeratorGaurdGuard]
  }, {
    path: "moderator/mandicommodities/editmandicommodity/:id",
    component: AddremovecommodityfrommandiComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard, ModeratorGaurdGuard]
  },
  ///// department routes
  {
    path: "department",
    component: DeparmenthomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,DeparmentgaurdGuard]
  },
  {
    path: "department/retailratelist",
    component: DepartmentretailrateComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,DeparmentgaurdGuard]
  },
  {
    path: "department/retailratelist/deparmentaddretailrate/:id",
    component: DeparmentaddretailratesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,DeparmentgaurdGuard]
  },
  {
    path: 'department/mandiuser',
    component: DepartmentmandiusersComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,DeparmentgaurdGuard]
  }, {
    path: 'department/mandiuser/editmandiuser/:id',
    component: EditmandiuserComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,DeparmentgaurdGuard]
  },
  {
    path: 'admin/complaints',
    component: CompaintsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'admin/complaints/complaindetail/:id',
    component: ComplaintdetailComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path: 'department/complaints/complaindetail/:id',
    component: ViewcomplaintComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,DeparmentgaurdGuard]
  },
  {
    path: 'department/complaints',
    component: DeparmentcomplaintsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,DeparmentgaurdGuard]
  },
  {
    path: "admin/banners",
    component: BannersComponent,
    pathMatch: "full",
    canActivate: [AuthGuard,AdminauthGuard],
  },
  {
    path: "admin/banners/editbanner/:id",
    component: EditbannerComponent,
    pathMatch: "full",
    canActivate: [AuthGuard,AdminauthGuard]
  },
  {
    path:"unauthorized",
    component:UnauthorizedComponent,
    pathMatch:"full",
  },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  public static routes = routes;
}
