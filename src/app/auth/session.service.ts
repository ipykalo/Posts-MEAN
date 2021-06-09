import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private subject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isActiveToken);

    saveToken(token: string): void {
        token && sessionStorage.setItem('token', token);
    }

    getToken(): string {
        return sessionStorage.getItem('token');
    }

    get isActiveToken(): boolean {
        return !!this.getToken();
    }

    clearToken(): void {
        sessionStorage.removeItem('token');
        this.notify(false);
    }

    getSubscription(): Observable<boolean> {
        return this.subject.asObservable();
    }

    notify(value: boolean): void {
        this.subject.next(value);
    }
}
