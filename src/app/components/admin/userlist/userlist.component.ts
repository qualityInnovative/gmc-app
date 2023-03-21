import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { UserProfile } from 'src/app/ratelist-models';
import { UserService } from 'src/app/services/user/user.service';
import { Roles } from 'src/app/ratelist-models';
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
  constructor(
    private router: Router,
    private userService: UserService
  ) { }
  ngOnInit(): void {
    this.loading = true;
    this.getAllUsers();
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data.data.filter((user:UserProfile) => user.roleId !== Roles.admin);
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
    if(confirm("Are you sure you want to delete this user?")){
      this.userService.deleteUser(id).subscribe(
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

}
