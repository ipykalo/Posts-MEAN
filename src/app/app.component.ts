import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    posts: object[] = [];

    onPostAdded(post: object): void {
        this.posts.push(post);
    }
}
