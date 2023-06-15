import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class DeparmentgaurdGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loginService.isDepartmentUser()) {
      return true;
    } else {
      this.router.navigate(['unauthorized'], { queryParams: { returnUrl: state.url } });
      return false;
    }

  }

}
