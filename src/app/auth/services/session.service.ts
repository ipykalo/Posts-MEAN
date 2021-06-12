import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAuthData } from '../interfaces/auth-data.interface';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private subject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isActiveToken);

    saveAuthData(authData: IAuthData): void {
        try {
            localStorage.setItem('authData', JSON.stringify(authData));
        } catch (error) {
            console.log(error);
        }
    }

    getAuthData(): IAuthData {
        try {
            return JSON.parse(localStorage.getItem('authData'));
        } catch (error) {
            console.log(error);
        }
    }

    get isActiveToken(): boolean {
        const authData: IAuthData = this.getAuthData();
        if (!authData?.token || !authData?.expiresIn || !authData?.timestamp) {
            return false;
        }
        return (Date.now() - authData?.timestamp) / 1000 < authData.expiresIn;
    }

    get userId(): string {
        return this.getAuthData().userId;
    }

    clearToken(): void {
        localStorage.removeItem('authData');
        this.notify(false);
    }

    getSubscription(): Observable<boolean> {
        return this.subject.asObservable();
    }

    notify(value: boolean): void {
        this.subject.next(value);
    }
}
