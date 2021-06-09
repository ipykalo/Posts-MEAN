import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from './session.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

    constructor(private sessionService: SessionService, private router: Router) { }

    canActivate(): boolean {
        if (!this.sessionService.isActiveToken) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}
