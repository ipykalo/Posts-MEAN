import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private subject: Subject<boolean> = new Subject();

    saveToken(token: string): void {
        token && sessionStorage.setItem('token', token);
    }

    getToken(): string {
        return sessionStorage.getItem('token');
    }

    getSubscription(): Observable<boolean> {
        return this.subject.asObservable();
    }

    notify(value: boolean): void {
        this.subject.next(value);
    }
}
