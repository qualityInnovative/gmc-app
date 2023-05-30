import { Component, OnInit } from '@angular/core';
import { User, UserProfile } from 'src/app/ratelist-models';
import { LoginService } from 'src/app/ratelist-services';
import { Router, ActivatedRoute } from '@angular/router';
import { faSpinner, faBars, faAngleDown, faUserGear, faEnvelope, faPencil, faLock, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Roles } from 'src/app/ratelist-models';
// change detection strategy
import { ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'ratelist-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  Roles = Roles;
  faAngleDown = faAngleDown;
  faUserGear = faUserGear;
  faEnvelope = faEnvelope;
  faPencil = faPencil;
  faLock = faLock;
  faSpinner = faSpinner;
  faBars = faBars;
  faArrowRightFromBracket = faArrowRightFromBracket
  showPassword: boolean = false;
  navbarCollapsed: boolean = true;
  busy: boolean = false;
  hasError: boolean = false;
  user: User = new User() || undefined
  userProfile: UserProfile = new UserProfile();
  userId: number = 0;
  profileImage: string = "assets/images/profile.png";
  constructor(
    public loginService: LoginService,
    private route: Router,
  ) {
    this.dontShowHeaderinLogin();
    this.userId = this.loginService.getLoggedInUser().id;
  }
  ngOnInit(): void {
    this.getUserProfile(this.userId);
  }
  getUserProfile(id: number) {
    this.loginService.getUserProfile(id).subscribe((res: any) => {
      this.userProfile = res.data;
    })
  }
  dontShowHeaderinLogin(): boolean {
    return this.route.url == "/login" ? false : true;
  }
  getUserRole(user: User) {
    return user.roleId == Roles.admin ? "Admin" : user.roleId == Roles.mandiAdmin ? "mandiAdmin" : user.roleId == Roles.user ? "User" : user.roleId == Roles.departmentUser ? "Department User" : "User";
  }
  logout(): void {
    localStorage.removeItem('user');
    this.loginService.logout();
    this.route.navigate(['/']);
  }
  gotohome(): void {
    if (this.userProfile.roleId == Roles.admin) {
      this.route.navigate(['/admindashboard']);
    } else if (this.userProfile.roleId == Roles.mandiAdmin) {
      this.route.navigate(['/moderator']);
    } else if (this.userProfile.roleId == Roles.user) {
      this.route.navigate(['/home']);
    }else if(this.userProfile.roleId == Roles.departmentUser){
      this.route.navigate(['/department']);
    }
  }
  ngOnChanges() {
    this.getUserProfile(this.userId);
  }
}
