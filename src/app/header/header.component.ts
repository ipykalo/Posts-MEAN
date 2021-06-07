import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { SessionService } from "../auth/session.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    islogin: boolean;
    destroy: Subscription;

    constructor(private sessionService: SessionService) { }

    ngOnInit(): void {
        this.destroy = this.sessionService.getSubscription()
            .subscribe((resp: boolean) => this.islogin = resp)
    }

    ngOnDestroy(): void {
        this.destroy.unsubscribe();
    }

    logOut(): void {
        this.sessionService.clearToken();
    }
}