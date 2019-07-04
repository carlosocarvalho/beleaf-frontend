import { AuthService } from './../services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  profileFormGroup: FormGroup
  constructor(
    private readonly builder: FormBuilder,
    private readonly providerAuth: AuthService
  ) { }

  ngOnInit() {
    this.formInitializeCredentials(),

      this.providerAuth.attempt().subscribe(data => {

        this.profileFormGroup.patchValue(data)
      })
  }

  formInitializeCredentials() {

    this.profileFormGroup = this.builder.group({

      username: new FormControl({ value: null, disabled: true }, Validators.required),
      password: [null],
      email: [null],
      birthDay: [null]
    })
  }

  get in() {
    return this.profileFormGroup.controls
  }

}
