import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Apiresponse, UserProfile } from 'src/app/ratelist-models';
import { User } from 'src/app/ratelist-models';
import { LoginService } from 'src/app/ratelist-services';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'ratelist-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loggedInUser: User = new User();
  userprofile: UserProfile = new UserProfile();
  faEdit = faEdit;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loggedInUser = this.loginService.getLoggedInUser();
  }
  ngOnInit(): void {
    console.log('loggedin', this.loggedInUser);
    this.getLoggedInUserProfile(this.loggedInUser.id);
  }
  getLoggedInUserProfile(id: number) {
    this.loginService.getUserProfile(id).subscribe(
      (data: Apiresponse) => {
        console.log('user profile', data.data);
        this.userprofile = data.data;
      }, (error) => {
        console.log('error', error);
        this.toastr.error(error.error.message, 'Error');
      }
    );
  }
  editProfile() {
    this.router.navigate(['/editprofile']);
  }

}
