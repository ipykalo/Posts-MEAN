import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
    edit: boolean;
    post: Post;

    constructor(private postService: PostService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        const queryParams = this.route.snapshot?.queryParams;
        this.edit = queryParams?.hasOwnProperty('_id');
        this.edit && (this.post = {
            _id: queryParams?._id,
            title: queryParams?.title,
            content: queryParams?.content
        });
    }

    onSavePost(form: NgForm): void {
        this.edit ? this.onUpdatePost(form) : this.onAddPost(form);
    }

    private onAddPost(form: NgForm): void {
        const post: Post = { _id: form.value._id, title: form.value.title, content: form.value.content };
        this.postService.addPost(post);
        form.resetForm();
    }

    private onUpdatePost(form: NgForm): void {
        const post: Post = { _id: this.post._id, title: form.value.title, content: form.value.content };
        this.postService.updatePost(post);
        form.resetForm();
    }
}
