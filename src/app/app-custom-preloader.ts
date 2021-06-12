import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";

export class AppCustomPreloader extends PreloadingStrategy {
    preload(route: Route, fn: () => Observable<any>): Observable<any> {
        return route?.data?.preload ? fn() : of(null);
    }
}