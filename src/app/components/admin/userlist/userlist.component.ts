import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { UserProfile } from 'src/app/ratelist-models';
import { UserService } from 'src/app/services/user/user.service';
import { Roles } from 'src/app/ratelist-models';
import { Mandi } from 'src/app/ratelist-models';
import { MandiService } from 'src/app/services/mandi/mandi.service';
import { Subject } from 'rxjs';
import { Corporation } from 'src/app/models/corporation';
import { CorporationService } from 'src/app/services/corporation/corporation.service';
@Component({
  selector: 'ratelist-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  corporations: Corporation[] = [];
  roles = Roles;
  loading = false;
  error = '';
  errorStatus = 0;
  faEdit = faEdit;
  faTrash = faTrash;
  users: UserProfile[] = [];
  mandis: Mandi[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private router: Router,
    private userService: UserService,
    private mandiService: MandiService,
    private corporationService: CorporationService
  ) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 30,
      processing: true
    };
    this.loading = true;
    this.getAllUsers();
   
    
  }
 
 
  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data.data.filter((user: UserProfile) => user.roleId !== Roles.admin);
        this.loading = false;
        console.log(this.users)
        this.dtTrigger.next(undefined);
      },
      (err) => {
        this.error = err.error.message;
        this.errorStatus = err.status;
        this.loading = false;
      }
    )
  }
  editUser(id: number) {
    this.router.navigate(['admin/userlist/edituser', id]);
  }
  deleteUser(id: number) {
    if (confirm("Are you sure you want to delete this user?")) {
      this.userService.admindeleteUser(id).subscribe(
        (data) => {
          this.getAllUsers();
        },
        (err) => {
          this.error = err.error.message;
          this.errorStatus = err.status;
          this.loading = false;
        }
      )
    }
  }
  getUserRole(role: number) {
    return this.roles[role];
  }
  getMandiName(mandiId: number) {
    let mandi = this.mandis.find((mandi: Mandi) => mandi.id === mandiId);
    return mandi ? mandi.name : '';
  }
  getCorporationName(corporationId: number) {
    let corporation = this.corporations.find((corporation: Corporation) => corporation.id === corporationId);
    return corporation ? corporation.name : '';
  }
  addUser() {
    this.router.navigate(['admin/userlist/edituser', 0]);
  }

}
