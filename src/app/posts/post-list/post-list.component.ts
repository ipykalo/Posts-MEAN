import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Post } from '../post.interface';
import { PostService } from '../post.service';


@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
    private destroy: Subscription[] = [];
    posts: Post[] = [];
    isLoading: boolean = false;
    totalPosts: number = 0;
    pageSize: number = 2;
    page: number = 1;
    pageSizeOptions: number[] = [1, 2, 3, 4, 5];

    constructor(private postService: PostService) { }

    ngOnInit(): void {
        this.fetchPost(this.pageSize, this.page);
    }

    ngOnDestroy(): void {
        this.destroy?.forEach((sub: Subscription) => sub?.unsubscribe());
    }

    onPage(event: PageEvent): void {
        this.page = event?.pageIndex + 1;
        this.pageSize = event?.pageSize;
        this.fetchPost(this.pageSize, this.page);
    }

    onDelete(post: Post): void {
        this.isLoading = true;
        const sub: Subscription = this.postService.deletePost(post._id)
            .subscribe(resp => {
                if (resp?.message) {
                    this.fetchPost(this.pageSize, this.page);
                }
                this.isLoading = false;
            });
        this.destroy.push(sub);
    }

    private fetchPost(pageSize: number, page: number): void {
        this.isLoading = true;
        const sub: Subscription = this.postService.getPosts(pageSize, page)
            .subscribe((resp: { posts: Post[], totalPosts: number }) => {
                this.posts = resp?.posts;
                this.totalPosts = resp?.totalPosts;
                this.isLoading = false;
            });
        this.destroy.push(sub);
    }
}
