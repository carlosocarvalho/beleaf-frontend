import { UserModule } from './../user/user.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { CarteModule } from '../carte/carte.module';

const routes: Routes = [{
    path: '',
    component: MainLayoutComponent,
    children: [
        { path: '', loadChildren: () => CarteModule },
        {
            path: 'users',
            loadChildren: () => UserModule
        }
    ]
},


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
