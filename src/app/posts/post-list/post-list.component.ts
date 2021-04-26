import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';


@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
    private destroy: Subscription;
    posts: Post[] = [];

    constructor(private postService: PostService) { }

    ngOnInit(): void {
        this.destroy = this.postService.getPosts()
            .subscribe((resp: Post[]) => this.posts = resp);
    }

    ngOnDestroy(): void {
        this.destroy.unsubscribe();
    }
}
