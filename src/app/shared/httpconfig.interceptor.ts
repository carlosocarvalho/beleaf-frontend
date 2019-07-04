import { AuthService, AuthServiceToken } from './../user/services/auth.service';
import { Injectable } from '@angular/core';

//import { ErrorDialogService } from '../error-dialog/errordialog.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { ErrorDialogService } from './error-dialog.service';

@Injectable() export class HttpConfigInterceptor implements HttpInterceptor {
    private token: string;
    constructor(
        private readonly errorHandler: ErrorDialogService,
        private readonly auth: AuthService
    ) {


    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token: string = null;

        if (!request.headers.has('Content-Type') && !(request.body instanceof FormData)) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }
        return this.auth.attempt()
            .pipe(
                mergeMap((data: AuthServiceToken) => {
                    if (data) {
                        const token = data.token
                        if (token) {
                            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
                        }
                    }
                    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });


                    return next.handle(request).pipe(
                        catchError((error: HttpErrorResponse) => {
                            let data = {};

                            data = {
                                message: error && error.error.message ? error.error.message : 'Ops!! tivemos um problema inesperado, tente novamente se isso acontecer por favor nos contate',
                                status: error.status
                            };
                            this.errorHandler.openDialog(data)
                            //this.errorDialogService.openDialog(data);
                            return throwError(error);
                        }),
                        map((event: HttpEvent<any>) => {

                            if (event instanceof HttpResponse) {
                                // console.log('event--->>>', event);
                            }
                            return event;
                        }));
                })
            );



    }


    handlerIntercept(next: HttpHandler, request: HttpRequest<any>) {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let data = {};

                data = {
                    message: error && error.error.message ? error.error.message : 'Ops!! tivemos um problema inesperado, tente novamente se isso acontecer por favor nos contate',
                    status: error.status
                };
                this.errorHandler.openDialog(data)
                //this.errorDialogService.openDialog(data);
                return throwError(error);
            }),
            map((event: HttpEvent<any>) => {

                if (event instanceof HttpResponse) {
                    // console.log('event--->>>', event);
                }
                return event;
            }));
    }
}