import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    editMode: boolean;

    constructor(private postService: PostService) { }

    ngOnInit(): void {
        this.postService.fetchPosts();
        this.destroy = this.postService.getPostsSub()
            .subscribe((resp: Post[]) => this.posts = resp);
    }

    ngOnDestroy(): void {
        this.destroy.unsubscribe();
    }

    onDelete(post: Post): void {
        this.postService.deletePost(post._id);
    }

    onEdit(): void {
        this.editMode = true;
    }

    onUpdatePost(form: NgForm, post: Post): void {
        this.editMode = false;
        const updatedPost: Post = { ...form.value, _id: post._id }
        this.postService.updatePost(updatedPost);
        form.resetForm();
    }
}
