import { Component, OnInit } from '@angular/core';
import { User ,UserProfile} from 'src/app/ratelist-models';
import { LoginService } from 'src/app/ratelist-services';
import { Router, ActivatedRoute } from '@angular/router';
import { faSpinner, faBars, faAngleDown, faUserGear, faEnvelope, faPencil, faLock, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Roles } from 'src/app/ratelist-models';

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
  userProfile:UserProfile = new UserProfile();
  userId:number = 0;
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
  getUserProfile(id:number){
    this.loginService.getUserProfile(id).subscribe((res:any)=>{
      this.userProfile = res.data;
    })
  }
  dontShowHeaderinLogin(): boolean {
    return this.route.url == "/login" ? false : true;
  }
  getUserRole(user: User) {
    return user.roleId == Roles.admin ? "Admin" : user.roleId == Roles.moderator ? "Moderator" : user.roleId == Roles.user ? "User" : "User";
  }
  logout(): void {
    this.loginService.logout();
    this.route.navigate(['/']);
  }


}
