import { AuthGuard } from './../shared/auth.guard';
import { FormComponent } from './form/form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [{

    path: '',
    component: ListComponent
},
{
    path: 'product/create',
    component: FormComponent,
    canActivate: [AuthGuard]
},
{
    path: 'product/:id',
    component: ShowComponent
},


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarteRoutingModule { }
