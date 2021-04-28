import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
    private destroy: Subscription[] = [];

    constructor(
        private postService: PostService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        const params = this.route.snapshot?.params;
        this.edit = params?.hasOwnProperty('id');
        this.post = this.postService.getPost(params?.id);
        if (this.edit && !this.post) {
            const sub: Subscription = this.postService.fetchPost(params?.id)
                .subscribe((resp: Post) => {
                    this.post = {
                        _id: resp?._id,
                        title: resp?.title,
                        content: resp?.content
                    }
                });
            this.destroy.push(sub);
        }
    }

    ngOnDestroy(): void {
        this.destroy.forEach((sub: Subscription) => sub?.unsubscribe());
    }

    onSavePost(form: NgForm): void {
        this.edit ? this.onUpdatePost(form) : this.onAddPost(form);
    }

    private onAddPost(form: NgForm): void {
        const post: Post = { _id: form.value._id, title: form.value.title, content: form.value.content };
        const sub: Subscription = this.postService.addPost(post)
            .subscribe(resp => {
                if (!resp?.message) {
                    return;
                }
                form.resetForm();
                this.router.navigateByUrl('/');
            });
        this.destroy.push(sub);
    }

    private onUpdatePost(form: NgForm): void {
        const post: Post = { _id: this.post._id, title: form.value.title, content: form.value.content };
        const sub: Subscription = this.postService.updatePost(post)
            .subscribe(resp => {
                if (!resp?.message) {
                    return;
                }
                form.resetForm();
                this.router.navigateByUrl('/');
            });
        this.destroy.push(sub);
    }
}
