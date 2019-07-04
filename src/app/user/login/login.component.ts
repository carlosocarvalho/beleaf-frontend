import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup
  submitted = false
  inLoading = false
  goAfterLogin: string
  constructor(
    private readonly provider: AuthService,
    private readonly builder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute) {


  }

  ngOnInit() {
    this.formInitialize()
    this.goAfterLogin = this.route.snapshot.queryParams['rtnUrl'] || '/'
  }

  formInitialize() {
    this.loginFormGroup = this.builder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    })
  }

  get in() {
    return this.loginFormGroup.controls
  }
  login() {
    this.submitted = true
    if (this.loginFormGroup.invalid) return;
    const { username, password } = this.loginFormGroup.value
    this.inLoading = true;
    this.provider
      .login(username, password)
      .then(b => {
        delay(1000)
        this.router.navigate([this.goAfterLogin])
      })
      .catch(e => {

        this.inLoading = false;
        this.submitted = false;
      })


  }

}
