import { AuthServiceToken, AuthService } from './../../user/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const INITIAL_LOGIN_ROUTER = '/users/login'

@Component({
  selector: 'beleaf-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  login: AuthServiceToken | null
  routerLinkCurrent = INITIAL_LOGIN_ROUTER
  constructor(
    private readonly authService: AuthService,
    private readonly route: Router
  ) { }

  ngOnInit() {

    this.authService.credentials().subscribe(change => {
      this.credentialsProfileInitialize()
    })
    this.credentialsProfileInitialize()



  }

  credentialsProfileInitialize() {
    this.authService.attempt().subscribe((data) => {
      if (data) {
        this.routerLinkCurrent = '/users/account'
        this.login = data;
      } else {
        this.login = null
        this.routerLinkCurrent = INITIAL_LOGIN_ROUTER
      }

    })
  }

  logout() {
    console.log(`logout..`)
    this.authService.logout().subscribe((data) => {
      if (data) {
        this.route.navigate(['/'])
      }
    })
  }

}
