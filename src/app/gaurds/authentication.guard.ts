import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "../service/auth.service";
import {Observable} from "rxjs";



@Injectable({
  providedIn:'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(public authService: AuthService, private router :Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated == true) {
      return true;
    } else {
      this.router.navigateByUrl("/login")
      return false;
    }
  }
}