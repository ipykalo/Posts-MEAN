import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { SessionService } from "../auth/session.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    isAuthenticated: boolean;
    destroy: Subscription;

    constructor(private sessionService: SessionService, private authService: AuthService) { }

    ngOnInit(): void {
        this.destroy = this.sessionService.getSubscription()
            .subscribe((value: boolean) => this.isAuthenticated = value)
    }

    ngOnDestroy(): void {
        this.destroy.unsubscribe();
    }

    onLogout(): void {
        this.authService.logout();
    }
}