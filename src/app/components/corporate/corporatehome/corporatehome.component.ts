import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/ratelist-models';
import { LoginService } from 'src/app/ratelist-services';
import { CorporationService } from 'src/app/services/corporation/corporation.service';
import { Corporation } from 'src/app/models/corporation';
import { Role } from 'src/app/ratelist-models';
import { Roles } from 'src/app/ratelist-models';
import { RoleService } from 'src/app/services/role/role.service';
import {Router} from '@angular/router';
import { Subject } from 'rxjs';
@Component({
  selector: 'ratelist-corporatehome',
  templateUrl: './corporatehome.component.html',
  styleUrls: ['./corporatehome.component.scss']
})
export class CorporatehomeComponent implements OnInit {
  corporateusers: User[] = [];
  loggedinUser: User = new User();
  corporations: Corporation[] = [];
  roles: Role[] = [];
  currentCorporation: Corporation = new Corporation();
  Role= Roles;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    public lo: LoginService,
    public corporationService: CorporationService,
    public roleService: RoleService,
    public router: Router
  ) { }
  ngOnInit(): void {
    this.getLoggedInUser();
  }
  getRoles() {
    this.roleService.getAllRoles().subscribe(
      (data) => {
        this.roles = data.data;
        console.log(this.roles);
      },
      (err) => {
        console.log(err);
      })
  }
  getCorporations() {
    this.corporationService.getCorporations()
    .subscribe(
      (data) => {
        this.corporations = data.data;
        console.log(this.corporations)
        this.getCorporationNameofUser(this.loggedinUser.CorporationId);
        },
      (err) => {
        console.log(err);
      })
  }
  getLoggedInUser() {
    this.loggedinUser = this.lo.getLoggedInUser();
    if (this.loggedinUser.roleId == Roles.corporateAdmin) {
      this.getuserfromadmincorporation(this.loggedinUser.CorporationId);
    }
    this.getCorporations();
    this.getRoles();
  }
  getuserfromadmincorporation(id: number) {
    this.corporationService.getuserfromadmincorporation(id).subscribe(
      (data) => {
        this.corporateusers = data.data;
        console.log(this.corporateusers); 
        this.dtTrigger.next(this.corporateusers);
      },
      (err) => {
        console.log(err);
      })
  }
  getCorporationName(id: number) {
    return this.corporations.find(x => x.id == id)?.name;
  }
  getUserRole(id: number) {
    return this.roles.find(x => x.id == id)?.name;
  }
  addUser() {
    this.router.navigate(['/corporate/addcorporateuser',0]);
  }
  getCorporationNameofUser(id: number) {
  this.currentCorporation= this.corporations.find(x => x.id == id) || new Corporation();
    
  }

}
