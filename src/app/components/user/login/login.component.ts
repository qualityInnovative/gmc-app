import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, Apiresponse } from 'src/app/ratelist-models';
import { LoginService } from 'src/app/ratelist-services';
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faLock, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Roles } from 'src/app/ratelist-models';
@Component({
  selector: 'ratelist-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Roles = Roles;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faLock = faLock;
  faSpinner = faSpinner;
  user: User = new User();
  showPassword: boolean = false;
  busy: boolean = false;
  hasError: boolean = false;
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    if (this.loginService.isUserLoggedIn()) {
      this.router.navigate(['/']);
    }
  }
  ngOnInit(): void { }
  seepassword(): void {
    if (
      (document.getElementById("password") as HTMLInputElement).type ===
      "password"
    ) {
      (document.getElementById("password") as HTMLInputElement).setAttribute(
        "type",
        "text"
      );
      this.showPassword = true;
    } else {
      (document.getElementById("password") as HTMLInputElement).setAttribute(
        "type",
        "password"
      );
      this.showPassword = false;
    }
  }
  signIn() {
    this.busy = true;
    this.loginService.login(this.user.email, this.user.password)
      .subscribe((res: Apiresponse) => {
        console.log("res", res);
        this.busy = false;
        if (res.success) {
          console.log("res", res);
          this.loginService._authState.next(res.data.user);
          this.loginService.setToken(res.data.token);
          this.loginService.setUser(res.data.user);
          
          if (res.data.user.roleId == Roles.admin) {
            this.router.navigate(['/admindashboard']);
          } else if (res.data.user.roleId == Roles.mandiAdmin) {
            this.router.navigate(['/moderator']);
          } else if (res.data.user.roleId == Roles.mandiUser) {
            this.router.navigate(['/home']);
          } else if (res.data.user.roleId == Roles.departmentUser || res.data.user.roleId == Roles.departmentHod || res.data.user.roleId == Roles.departmentOfficer) {
            this.router.navigate(['/department']);
          } else if(res.data.user.roleId == Roles.corporateUser || res.data.user.roleId == Roles.corporateAdmin){
            this.router.navigate(['/corporate']);
          } else {
            this.router.navigate(['/']);
          }
        } else {
          this.hasError = true;
          alert(res.message);
        }
      }, err => {
        this.busy = false;
        this.hasError = true;
        console.log('error', err.error.message);
        alert(err.error.message);
      });
  }

}
