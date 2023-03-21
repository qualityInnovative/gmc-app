import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: 'admin/states',
    component: AdminhomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/states/editstates/:id',
    component: EditstatesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/districts',
    component: DistrictsComponent,
    pathMatch: 'full'
    , canActivate: [AuthGuard]
  },
  {
    path: 'admin/districts/editdistricts/:stateId/:districtId',
    component: EditdistrictComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/tehsils',
    component: TehsilsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/tehsils/edittehsil/:districtId/:tehsilId',
    component: EdittehsilComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/categories',
    component: CategoriesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/categories/editcategory/:categoryId',
    component: EditcategoryComponent,
    pathMatch: 'full'
    ,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/units',
    component: UnitsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/units/editunit/:unitId',
    component: EditunitsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/commodities/:page',
    component: CommoditiesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/commodities/editcommodity/:commodityId',
    component: EditcommoditiesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
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
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/userlist/edituser/:userId',
    component: EdituserComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },{
    path: 'category/:commodityId',
    component: CategoryComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path:'ratelist/:commodityId',
    component:RatelistComponent,
    pathMatch:'full',
    canActivate:[AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  public static routes = routes;
}
