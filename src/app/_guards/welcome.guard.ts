import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../_core/auth/auth.service';
import {first, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WelcomeGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user$.pipe(
      first(),
      map(user => {
        if (user == undefined) {
          return true;
        }
        return this.router.createUrlTree(["house"]);
      })
    )
  }

}
