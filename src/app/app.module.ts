import { ErrorDialogService, ErrorDialogComponent } from './shared/error-dialog.service';
import { StorageModule } from '@ngx-pwa/local-storage';
import { HttpConfigInterceptor } from './shared/httpconfig.interceptor';
import { LayoutModule } from './layout/layout.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import { AppRoutingModule } from './app.routing';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt, 'pt');
/**APP IMPORT */
import { AppComponent } from './app.component';


@NgModule({
    declarations: [AppComponent, ErrorDialogComponent],
    imports: [
        StorageModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatDialogModule,
        HttpClientModule, AppRoutingModule, LayoutModule],
    providers: [
        ErrorDialogService,
        { provide: HTTP_INTERCEPTORS, multi: true, useClass: HttpConfigInterceptor }
    ],

    entryComponents: [
        ErrorDialogComponent
    ],
    exports: [
        HttpClientModule
    ],
    bootstrap: [AppComponent],

})
export class AppModule { }
