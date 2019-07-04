import { ErrorDialogService } from './../../shared/error-dialog.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { ConfirmPassword } from 'src/app/helpers';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup
  submitted = false
  inLoading = false

  constructor(
    private readonly provider: AuthService,
    private readonly builder: FormBuilder,
    private readonly router: Router,
    private readonly handlerDialog: ErrorDialogService) { }

  ngOnInit() {
    this.formInitialize()
  }

  formInitialize() {
    this.registerFormGroup = this.builder.group({
      username: [`jonas`, Validators.required],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
      fullName: ['Carlos Carvalho', Validators.required],
      email: ['cjc@modalnetworks.com', Validators.required],
      birthDay: [new Date(), Validators.required],
      confirmPassword: ['123456', Validators.required],
    },
      {
        validator: ConfirmPassword('password', 'confirmPassword')
      })
  }

  get in() {
    return this.registerFormGroup.controls
  }
  register() {
    this.submitted = true
    if (this.registerFormGroup.invalid) return;
    //const { username, password } = this.registerFormGroup.value
    this.inLoading = true;
    this.provider
      .create(this.registerFormGroup.value)
      .then(b => {

        const dialog = this.handlerDialog.openDialog({
          message: 'Parabéns, o seu cadastro foi finalizado',
          status: 201
        });

        dialog.afterClosed().subscribe(() => {
          this.router.navigate([`/`])
        })

      })
      .catch(e => {

        this.inLoading = false;
        this.submitted = false;
      })


  }
}
