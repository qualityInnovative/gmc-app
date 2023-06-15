import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/ratelist-services';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ModeratorGaurdGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.loginService.isAdminUser()){
        return true;
      }else{
        this.router.navigate(['unauthorized'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    
  }
  
}
