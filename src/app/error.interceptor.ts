import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from './error-modal/error-modal.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private dialogService: MatDialog) { }

    intercept(request: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
        return next.handle(request)
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    this.dialogService.open(ErrorModalComponent, {
                        data: {
                            title: 'Error Message',
                            message: err.error.message
                        },
                        minWidth: '500px'
                    });
                    return throwError(err);
                })
            );
    }
}
