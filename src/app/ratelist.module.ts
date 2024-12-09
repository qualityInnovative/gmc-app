import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppRoutingModule } from './ratelist-routing.module';
import { AppComponent } from './components/layout/app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RatelistinterceptorInterceptor } from './ratelistinterceptor/ratelistinterceptor.interceptor';
import { FormsModule } from '@angular/forms';
import { AdminhomeComponent } from './components/admin/adminhome/adminhome.component';
import { OfflinehomeComponent } from './components/offline/offlinehome/offlinehome.component';
import { AboutusComponent } from './components/offline/aboutus/aboutus.component';
import { ContactusComponent } from './components/offline/contactus/contactus.component';
import { AdminmenuComponent } from './components/misc/adminmenu/adminmenu.component';
import { BreadcrumbComponent } from './components/misc/breadcrumb/breadcrumb.component';
import { StatesComponent } from './components/admin/states/states.component';
import { DataTablesModule } from 'angular-datatables';
import { EditstatesComponent } from './components/admin/states/editstates/editstates.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { HomeComponent } from './components/user/home/home.component';
import { MenuComponent } from './components/misc/menu/menu.component';
import { UserlistComponent } from './components/admin/userlist/userlist.component';
import { EdituserComponent } from './components/admin/userlist/edituser/edituser.component';
import { CategoryComponent } from './components/user/category/category.component';
import { RatelistComponent } from './components/user/ratelist/ratelist.component';
import { UserratelistdashboardComponent } from './components/user/userratelistdashboard/userratelistdashboard.component';
import { LoadingscreenComponent } from './components/misc/loadingscreen/loadingscreen.component';
import { MandiComponent } from './components/admin/mandi/mandi.component';
import { EditmandiComponent } from './components/admin/mandi/editmandi/editmandi.component';
import { DistrictrateconfigurationComponent } from './components/admin/districtrateconfiguration/districtrateconfiguration.component';
import { EditdistrictconfigurationComponent } from './components/admin/districtrateconfiguration/editdistrictconfiguration/editdistrictconfiguration.component';
import { MandicommoditypricingComponent } from './components/admin/mandicommoditypricing/mandicommoditypricing.component';
import { EditmandicommoditypricingComponent } from './components/admin/mandicommoditypricing/editmandicommoditypricing/editmandicommoditypricing.component';
import { DeparmentsComponent } from './components/admin/deparments/deparments.component';
import { DesignationComponent } from './components/admin/designation/designation.component';
import { EditdeparmentComponent } from './components/admin/deparments/editdeparment/editdeparment.component';
import { EditdesignationComponent } from './components/admin/designation/editdesignation/editdesignation.component';
import { AdminRetailratelistComponent } from './components/admin/admin-retailratelist/admin-retailratelist.component';
import { EditadminRetailratelistComponent } from './components/admin/admin-retailratelist/editadmin-retailratelist/editadmin-retailratelist.component';
import { EditprofileComponent } from './components/user/editprofile/editprofile.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ResetpasswordComponent } from './components/user/resetpassword/resetpassword.component';

import { ModeratordashboardComponent } from './components/moderator/moderatordashboard/moderatordashboard.component';
import { AdmindashboardComponent } from './components/admin/admindashboard/admindashboard.component';

import { ModeratormenuComponent } from './components/misc/moderatormenu/moderatormenu.component';
import { ModeratorhomeComponent } from './components/moderator/moderatorhome/moderatorhome.component';
import { ModeratordistricconfigurationComponent } from './components/moderator/moderatordistricconfiguration/moderatordistricconfiguration.component';
import { ModeratormandicommoditypricingComponent } from './components/moderator/moderatormandicommoditypricing/moderatormandicommoditypricing.component';
import { ModeratorretailratelistComponent } from './components/moderator/moderatorretailratelist/moderatorretailratelist.component';
import { ModeratormandiusersComponent } from './components/moderator/moderatormandiusers/moderatormandiusers.component';
import { MandicommoditiesComponent } from './components/moderator/mandicommodities/mandicommodities.component';
import { AddremovecommodityfrommandiComponent } from './components/moderator/mandicommodities/addremovecommodityfrommandi/addremovecommodityfrommandi.component';
import { AddeditmandicommoditypricingComponent } from './components/moderator/moderatormandicommoditypricing/addeditmandicommoditypricing/addeditmandicommoditypricing.component';
import { AddmoderatorratelistComponent } from './components/moderator/moderatorretailratelist/addmoderatorratelist/addmoderatorratelist.component';
import { MandirateComponent } from './components/user/mandirate/mandirate.component';
import { EditmandirateComponent } from './components/user/mandirate/editmandirate/editmandirate.component';
import { CreatemandiuserComponent } from './components/moderator/moderatormandiusers/createmandiuser/createmandiuser.component';

import { DepartmentmandiusersComponent } from './components/department/departmentmandiusers/departmentmandiusers.component';
import { DepartmentretailrateComponent } from './components/department/departmentretailrate/departmentretailrate.component';
import { DepartmentmenuComponent } from './components/misc/departmentmenu/departmentmenu.component';
import { DeparmenthomeComponent } from './components/department/deparmenthome/deparmenthome.component';
import { DeparmentaddretailratesComponent } from './components/department/departmentretailrate/deparmentaddretailrates/deparmentaddretailrates.component';
import { EditmandiuserComponent } from './components/department/departmentmandiusers/editmandiuser/editmandiuser.component';
import { CompaintsComponent } from './components/admin/compaints/compaints.component';
import { ComplaintdetailComponent } from './components/admin/compaints/complaintdetail/complaintdetail.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { DeparmentcomplaintsComponent } from './components/department/deparmentcomplaints/deparmentcomplaints.component';
import { ViewcomplaintComponent } from './components/department/deparmentcomplaints/viewcomplaint/viewcomplaint.component';
import { RemarkhistoryComponent } from './components/misc/remarkhistory/remarkhistory.component';
import { BannersComponent } from './components/admin/banners/banners.component';
import { EditbannerComponent } from './components/admin/banners/editbanner/editbanner.component';
import { UnauthorizedComponent } from './components/misc/unauthorized/unauthorized.component';
import { RolesComponent } from './components/admin/roles/roles.component';
import { ViewrolesComponent } from './components/admin/roles/viewroles/viewroles.component';
import { CorporationComponent } from './components/admin/corporation/corporation.component';
import { ViewcorporationComponent } from './components/admin/corporation/viewcorporation/viewcorporation.component';
import { CorporatehomeComponent } from './components/corporate/corporatehome/corporatehome.component';
import { CorporatemenuComponent } from './components/misc/corporatemenu/corporatemenu.component';
import { CorporatepricesComponent } from './components/corporate/corporateprices/corporateprices.component';
import { CorporatepricefactorComponent } from './components/corporate/corporatepricefactor/corporatepricefactor.component';
import { ViewcorporatefactorComponent } from './components/corporate/corporatepricefactor/viewcorporatefactor/viewcorporatefactor.component';
import { CorporatepricefactoradminComponent } from './components/corporate/corporatepricefactoradmin/corporatepricefactoradmin.component';
import { ViewcorporatepriceadminComponent } from './components/corporate/corporatepricefactoradmin/viewcorporatepriceadmin/viewcorporatepriceadmin.component';
import { AddcorporateuserComponent } from './components/corporate/addcorporateuser/addcorporateuser.component';
import { CorporateaddretailrateComponent } from './components/corporate/corporateaddretailrate/corporateaddretailrate.component';
import { ViewcorporateretailrateComponent } from './components/corporate/corporateaddretailrate/viewcorporateretailrate/viewcorporateretailrate.component';
import { CoprativecategoryComponent } from './components/admin/coprativecategory/coprativecategory.component';
import { ViewcoprativecategoryComponent } from './components/admin/coprativecategory/viewcoprativecategory/viewcoprativecategory.component';
import { CorporatecommoditiesComponent } from './components/corporate/corporatecommodities/corporatecommodities.component';
import { ViewcorporatecommoditiesComponent } from './components/corporate/corporatecommodities/viewcorporatecommodities/viewcorporatecommodities.component';
import { AddcommoditydiscountComponent } from './components/corporate/addcommoditydiscount/addcommoditydiscount.component';
import { ViewaddcommoditydiscountComponent } from './components/corporate/addcommoditydiscount/viewaddcommoditydiscount/viewaddcommoditydiscount.component';
import { CorporateratesComponent } from './components/corporate/corporaterates/corporaterates.component';
import { ViewcorporateratesComponent } from './components/corporate/corporaterates/viewcorporaterates/viewcorporaterates.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ComplainttableComponent } from './components/admin/complainttable/complainttable.component';
import { SuggestionsComponent } from './components/admin/suggestions/suggestions.component';
import { ViewsuggestionsComponent } from './components/admin/suggestions/viewsuggestions/viewsuggestions.component';
import { DepartmentGrevanceCategoryComponent } from './components/admin/department-grevance-category/department-grevance-category.component';
import { ViewdepartmentGrevanceCategoryComponent } from './components/admin/department-grevance-category/viewdepartment-grevance-category/viewdepartment-grevance-category.component';
import { DepartmentsubcategoryComponent } from './components/admin/departmentsubcategory/departmentsubcategory.component';
import { ViewsubcategoryComponent } from './components/admin/departmentsubcategory/viewsubcategory/viewsubcategory.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AdminhomeComponent,
    OfflinehomeComponent,
    AboutusComponent,
    ContactusComponent,
    AdminmenuComponent,
    BreadcrumbComponent,
    StatesComponent,
    EditstatesComponent,
    DistrictsComponent,
    EditdistrictComponent,
    TehsilsComponent,
    EdittehsilComponent,
    CategoriesComponent,
    EditcategoryComponent,
    UnitsComponent,
    EditunitsComponent,
    CommoditiesComponent,
    EditcommoditiesComponent,
    HomeComponent,
    MenuComponent,
    UserlistComponent,
    EdituserComponent,
    CategoryComponent,
    RatelistComponent,
    UserratelistdashboardComponent,
    LoadingscreenComponent,
    MandiComponent,
    EditmandiComponent,
    DistrictrateconfigurationComponent,
    EditdistrictconfigurationComponent,
    MandicommoditypricingComponent,
    EditmandicommoditypricingComponent,
    DeparmentsComponent,
    DesignationComponent,
    EditdeparmentComponent,
    EditdesignationComponent,
    AdminRetailratelistComponent,
    EditadminRetailratelistComponent,
    EditprofileComponent,
    ProfileComponent,
    ResetpasswordComponent,
    ModeratordashboardComponent,
    ModeratormenuComponent,
    AdmindashboardComponent,
    ModeratorhomeComponent,
    ModeratordistricconfigurationComponent, 
    ModeratormandicommoditypricingComponent, 
    ModeratorretailratelistComponent, 
    ModeratormandiusersComponent, 
    MandicommoditiesComponent, 
    AddremovecommodityfrommandiComponent, 
    AddeditmandicommoditypricingComponent, 
    AddmoderatorratelistComponent, 
    MandirateComponent, 
    EditmandirateComponent, 
    CreatemandiuserComponent, 
    DepartmentmandiusersComponent, 
    DepartmentretailrateComponent, 
    DepartmentmenuComponent,
    DeparmenthomeComponent, 
    DeparmentaddretailratesComponent, 
    EditmandiuserComponent, 
    CompaintsComponent, 
    ComplaintdetailComponent, 
    DeparmentcomplaintsComponent,
    ViewcomplaintComponent,
    RemarkhistoryComponent,
    BannersComponent,
    EditbannerComponent,
    UnauthorizedComponent,
    RolesComponent,
    ViewrolesComponent,
    CorporationComponent,
    ViewcorporationComponent,
    CorporatehomeComponent,
    CorporatemenuComponent,
    CorporatepricesComponent,
    CorporatepricefactorComponent,
    ViewcorporatefactorComponent,
    CorporatepricefactoradminComponent,
    ViewcorporatepriceadminComponent,
    AddcorporateuserComponent,
    CorporateaddretailrateComponent,
    ViewcorporateretailrateComponent,
    CoprativecategoryComponent,
    ViewcoprativecategoryComponent,
    CorporatecommoditiesComponent,
    ViewcorporatecommoditiesComponent,
    AddcommoditydiscountComponent,
    ViewaddcommoditydiscountComponent,
    CorporateratesComponent,
    ViewcorporateratesComponent,
    ComplainttableComponent,
    SuggestionsComponent,
    ViewsuggestionsComponent,
    DepartmentGrevanceCategoryComponent,
    ViewdepartmentGrevanceCategoryComponent,
    DepartmentsubcategoryComponent,
    ViewsubcategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    DataTablesModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RatelistinterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
