
import { MainLayoutComponent } from './layouts/main-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout.routing';
import { NavbarComponent } from '../components/navbar/navbar.component';

@NgModule({
    declarations: [MainLayoutComponent, NavbarComponent],
    imports: [
        CommonModule,
        LayoutRoutingModule
    ],
    exports: [LayoutRoutingModule, NavbarComponent]
})
export class LayoutModule { }
