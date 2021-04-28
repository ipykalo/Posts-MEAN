import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';


@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
    private destroy: Subscription[] = [];
    posts: Post[] = [];

    constructor(private postService: PostService, private router: Router) { }

    ngOnInit(): void {
        this.fetchPost();
    }

    ngOnDestroy(): void {
        this.destroy?.forEach((sub: Subscription) => sub?.unsubscribe());
    }

    onDelete(post: Post): void {
        const sub: Subscription = this.postService.deletePost(post._id)
            .subscribe(resp => {
                if (resp?.message) {
                    this.fetchPost();
                }
            });
        this.destroy.push(sub);
    }

    private fetchPost(): void {
        const sub: Subscription = this.postService.getPosts()
            .subscribe((resp: Post[]) => this.posts = resp);
        this.destroy.push(sub);
    }
}
