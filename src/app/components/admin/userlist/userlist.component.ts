import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { UserProfile } from 'src/app/ratelist-models';
import { UserService } from 'src/app/services/user/user.service';
import { Roles } from 'src/app/ratelist-models';
import { Mandi } from 'src/app/ratelist-models';
import { MandiService } from 'src/app/services/mandi/mandi.service';
@Component({
  selector: 'ratelist-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  roles = Roles;
  loading = false;
  error = '';
  errorStatus = 0;
  faEdit = faEdit;
  faTrash = faTrash;
  users: UserProfile[] = [];
  mandis: Mandi[] = [];
  constructor(
    private router: Router,
    private userService: UserService,
    private mandiService: MandiService
  ) { }
  ngOnInit(): void {
    this.loading = true;
    this.getAllUsers();
    this.getAllMandis();
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
  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data.data.filter((user: UserProfile) => user.roleId !== Roles.admin);
        this.loading = false;
        console.log(this.users)
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

}
