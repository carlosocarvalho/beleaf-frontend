import { UserRoutingModule } from './user.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [RegisterComponent, AccountComponent, LoginComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class UserModule { }
