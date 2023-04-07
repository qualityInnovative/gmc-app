import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MandiusersService } from 'src/app/services/mandiusers/mandiusers.service';
import { UserProfile } from 'src/app/ratelist-models';
import { Apiresponse } from 'src/app/ratelist-models';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'ratelist-createmandiuser',
  templateUrl: './createmandiuser.component.html',
  styleUrls: ['./createmandiuser.component.scss']
})
export class CreatemandiuserComponent implements OnInit {
  edit: boolean = false;
  userId: number = 0;
  user: UserProfile = new UserProfile();
  mandiId: number = 0;
  moderator: UserProfile = new UserProfile();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mandiusersService: MandiusersService,
    private location: Location,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
  }
  ngOnInit(): void {
    this.getMandiId();
    this.isEdit();
  }
  getMandiId() {
    this.userService.getUserProfile().subscribe(
      (data: Apiresponse) => {
        this.mandiId = data.data.Profile.mandiId;
        this.moderator = data.data;
        console.log(this.mandiId);
      },
      (error) => {
        console.log(error);
      })
  }

  isEdit() {
    if (this.userId > 0) {
      console.log("edit");
      this.edit = true;
      this.getMandiUser(this.userId);
    } else {
      console.log("create");
      this.edit = false;
    }
  }
  getMandiUser(userId: number) {
    this.mandiusersService.getMandiUser(userId).subscribe(
      (data: any) => {
        this.user = data.data;
      },
      (error) => {
        console.log(error);
      })
  }
  onSubmit() {
    this.user.roleId = 3;
    this.user.Profile.mandiId = this.mandiId;
    if (this.edit) {
      this.mandiusersService.updateMandiUser(this.userId, this.user).subscribe(
        (data: any) => {
          console.log(data);
          this.back();
        },
        (error) => {
          this.toastr.error(error.error.message);
        })
    } else {
      this.mandiusersService.createMandiUser(this.user).subscribe(
        (data: any) => {
          console.log(data);
          if (data.success) {
            this.toastr.success("User created successfully");
            this.back();
          }
          else if (data.message == "User already exists") {
            this.toastr.error("User already exists");
            this.back();
          }
        },
        (error) => {
          if (error.error.data.name == "SequelizeUniqueConstraintError") {
            this.toastr.error("User already exists");
          }
          else {
            this.toastr.error(error.error.message);
          }
        })
    }
  }
  back() {
    this.location.back();
  }

}
