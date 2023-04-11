import { Component, OnInit } from '@angular/core';
import { Apiresponse, UserProfile } from 'src/app/ratelist-models';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/ratelist-services';
import { Role } from 'src/app/ratelist-models';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'ratelist-editmandiuser',
  templateUrl: './editmandiuser.component.html',
  styleUrls: ['./editmandiuser.component.scss']
})
export class EditmandiuserComponent implements OnInit {
  loading = false;
  errorStatus = false;
  error = '';
  userProfile: UserProfile = new UserProfile();
  userId: number = 0;
  roles: Role[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
  }
  ngOnInit(): void {
    this.isEdit();
    this.getUserRoles();
  }
  isEdit() {
    if (this.userId) {
      this.getUserById();
    }
  }
  getUserRoles() {
    this.userService.getUserRoles().subscribe(
      (data) => {
        this.roles = data.data.filter((role: Role) => role.name !== 'admin' && role.name !== 'departmentUser');
        this.loading = false;
      },
      (err) => {
        console.log(err);
      }
    )
  }
  getUserById() {
    this.loading = true;
    this.userService.getUserById(this.userId).subscribe(
      (data) => {
        this.userProfile = data.data;
        this.loading = false;
        console.log(this.userProfile);
      },
      (err) => {
        this.error = err.error.message;
        this.errorStatus = err.status;
        this.loading = false;
      }
    )
  }
  saveUser() {
    this.userService.adminUpdateUser(this.userProfile).subscribe(
      (data: Apiresponse) => {
        if (data.success) {
          this.back();
          this.toastr.success(data.message);
        } else {
          this.toastr.error(data.message);
        }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.toastr.error(error.error.message)
      }
    )
  }

  back() {
    this.location.back();
  }

}
