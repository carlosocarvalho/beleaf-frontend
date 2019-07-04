
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout.component';


const routes: Routes = [{
    path: '',
    component: MainLayoutComponent,
    children: [
        { path: '', loadChildren: '../carte/carte.module#CarteModule' },
        {
            path: 'users',
            loadChildren: '../user/user.module#UserModule'
        }
    ]
},


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
