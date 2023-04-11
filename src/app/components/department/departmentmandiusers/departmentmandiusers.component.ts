import { Component, OnInit } from '@angular/core';
import { Role, UserProfile } from 'src/app/ratelist-models';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user/user.service';
import { Roles } from 'src/app/ratelist-models';
import { DeparmentretailrateService } from 'src/app/services/deparmentretailrate/deparmentretailrate.service';
import { Subject } from 'rxjs';
import { MandiService } from 'src/app/services/mandi/mandi.service';
import { Mandi } from 'src/app/ratelist-models';
import { Router } from '@angular/router';
@Component({
  selector: 'ratelist-departmentmandiusers',
  templateUrl: './departmentmandiusers.component.html',
  styleUrls: ['./departmentmandiusers.component.scss']
})
export class DepartmentmandiusersComponent implements OnInit {
  loading = false;
  errorStatus = false;
  error = '';
  faEdit = faEdit;
  faTrash = faTrash;
  users: UserProfile[] = []
  roles: Role[] = [];
  userProfile: UserProfile = new UserProfile();
  userMandi: number = 0;
  mandis: Mandi[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private userService: UserService,
    private DeparmentretailrateService: DeparmentretailrateService,
    private mandiService: MandiService,
    private router: Router,

  ) { }
  ngOnInit(): void {
    this.getUserProfile();
    this.getAllMandis();
    this.getAllRoles();
  }
  getAllRoles() {
    this.userService.getUserRoles().subscribe(
      (data) => {
        this.roles = data.data;
        this.loading = false;
      },
      (err) => {
        this.error = err.error.message;
        this.errorStatus = err.status;
        this.loading = false;
      }
    )
  }

  getRoleName(id: number) {
    // find roles array 
    let role = this.roles.find((role: Role) => role.id === id);
    return role?.name;
  }

  getAllMandis() {
    this.mandiService.getallMandis().subscribe(
      (data) => {
        this.mandis = data.data;
        this.loading = false;
      },
      (err) => {
        this.error = err.error.message;
        this.errorStatus = err.status;
        this.loading = false;
      }
    )
  }
  getMandiName(id: number) {
    let mandi = this.mandis.find((mandi: Mandi) => mandi.id === id);
    return mandi?.name;
  }
  getUserProfile() {
    this.loading = true;
    this.userService.getUserProfile().subscribe(
      (data) => {
        this.userProfile = data.data;
        this.userMandi = this.userProfile.Profile.mandiId;
        this.loading = false;
        this.getAllUsers();
      },
      (err) => {
        this.error = err.error.message;
        this.errorStatus = err.status;
        this.loading = false;
      }
    )
  }
  editUser(id: number) {
    this.router.navigate([`/department/mandiuser/editmandiuser/${id}`])
  }
  
  getAllUsers() {
    this.DeparmentretailrateService.getAllUsersofMandi(this.userMandi).subscribe(
      (data: any) => {
        this.users = data.data.filter((user: UserProfile) => user.roleId !== Roles.admin);
        this.loading = false;
        console.log(this.users)
        this.dtTrigger.next(this.users);
      },
      (err: any) => {
        this.error = err.error.message;
        this.errorStatus = err.status;
        this.loading = false;
      }
    )
  }
}
