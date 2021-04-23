import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
    @Output() postCreated: EventEmitter<Post> = new EventEmitter();

    constructor(private postService: PostService) { }

    onAddPost(form: NgForm): void {
        const post: Post = { title: form.value.title, content: form.value.content };
        this.postService.addPost(post);
    }
}
