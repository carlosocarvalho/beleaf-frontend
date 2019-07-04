import { AuthService, AuthServiceToken } from './../user/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly route: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.attempt().pipe(
      tap((data) => {
        if (data === null) this.route.navigate(['/users/login'], { queryParams: { rtnUrl: state.url } })
      }),
      map((data) => data !== null)
    )
    // if (logged === false)
    //   this.route.navigate(['/users/login'])
    // return logged;
  }

}
