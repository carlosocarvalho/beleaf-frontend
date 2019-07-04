import { AuthGuard } from './../shared/auth.guard';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';


const routers: Routes = [
    {
        path: 'account',
        component: AccountComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },

]
@NgModule({
    imports: [RouterModule.forChild(routers)],
    exports: [RouterModule]
})
export class UserRoutingModule {

}