import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {AuthService} from "../service/auth.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn:'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(private authService: AuthService, private router :Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated == true) {
      return true;
    } else {
      alert("vous n'etes pas authorizer")
      this.router.navigateByUrl("/admin")
      return false;
    }
  }
}