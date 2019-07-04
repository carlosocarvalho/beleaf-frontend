import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-layout',
    template: `
    <header id="header">
        <beleaf-navbar></beleaf-navbar>
    </header>        
        <router-outlet></router-outlet>
    
    `,
    styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
