import { Component, OnInit } from '@angular/core';
import { User, UserProfile } from 'src/app/ratelist-models';
import { LoginService } from 'src/app/ratelist-services';
import { Router, ActivatedRoute } from '@angular/router';
import { faSpinner, faBars, faAngleDown, faUserGear, faEnvelope, faPencil, faLock, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Roles } from 'src/app/ratelist-models';
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
    this.loginService._authState.subscribe((user: User) => {
      if (user) {
        this.getUserProfile(user.id);
      }
    })
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
    switch (user.roleId) {
      case Roles.admin:
        return "Admin";
      case Roles.mandiAdmin:
        return "mandi Admin";
      case Roles.mandiUser:
        return "Mandi User";
      case Roles.departmentUser:
        return "Department User";
      case Roles.departmentHod:
        return "Department HOD";
      case Roles.departmentOfficer:
        return "Department Officer";
      case Roles.corporateAdmin:
        return "Corporate Admin";
      case Roles.corporateUser:
        return "Corporate User";
        
      default:
        return "User";
    }
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
    } else if (this.userProfile.roleId == Roles.mandiUser) {
      this.route.navigate(['/home']);
    } else if (this.userProfile.roleId == Roles.departmentUser) {
      this.route.navigate(['/department']);
    }else if (this.userProfile.roleId == Roles.departmentHod) {
      this.route.navigate(['/department']);
    }else if (this.userProfile.roleId == Roles.departmentOfficer) {
      this.route.navigate(['/department']);
    }else if (this.userProfile.roleId == Roles.corporateAdmin) {
      this.route.navigate(['/corporate']);
    }else if (this.userProfile.roleId == Roles.corporateUser) {
      this.route.navigate(['/corporate']);
    }

  }
  ngOnChanges() {
    this.getUserProfile(this.userId);
  }


}
