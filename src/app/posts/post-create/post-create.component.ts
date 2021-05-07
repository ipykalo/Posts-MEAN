import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../post.interface';
import { PostService } from '../post.service';
import { mimeTypeValidator } from './mime-type.validator';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
    edit: boolean;
    post: Post;
    isLoading: boolean = false;
    form: FormGroup;
    imgPreview: string;
    private destroy: Subscription[] = [];

    constructor(
        private postService: PostService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.createForm();
        this.populateForm();
    }

    ngOnDestroy(): void {
        this.destroy.forEach((sub: Subscription) => sub?.unsubscribe());
    }

    onSelectImage(event: Event): void {
        const file: File = (event?.target as HTMLInputElement)?.files[0];
        const reader: FileReader = new FileReader();
        reader.onload = () => this.imgPreview = reader?.result as string;
        reader.readAsDataURL(file);
        this.form.patchValue({ image: file });
        this.form.updateValueAndValidity();
    }

    onSavePost(): void {
        this.edit ? this.onUpdatePost() : this.onAddPost();
    }

    private onAddPost(): void {
        this.isLoading = true;
        const post: Post = {
            title: this.form?.value?.title,
            content: this.form?.value?.content,
            image: this.form?.value?.image
        };
        const sub: Subscription = this.postService.addPost(post)
            .subscribe(resp => {
                if (!resp?.message) {
                    return;
                }
                this.isLoading = false;
                this.form.reset();
                this.router.navigateByUrl('/');
            });
        this.destroy.push(sub);
    }

    private onUpdatePost(): void {
        this.isLoading = true;
        const post: Post = {
            _id: this.post._id,
            title: this.form?.value?.title,
            content: this.form?.value?.content,
            image: this.form?.value?.image
        };
        const sub: Subscription = this.postService.updatePost(post)
            .subscribe(resp => {
                if (!resp?.message) {
                    return;
                }
                this.isLoading = false;
                this.form.reset();
                this.router.navigateByUrl('/');
            });
        this.destroy.push(sub);
    }

    private createForm(): void {
        this.form = new FormGroup({
            'title': new FormControl(null, [Validators.required, Validators.minLength(5)]),
            'content': new FormControl(null, [Validators.required]),
            'image': new FormControl(null, { asyncValidators: [mimeTypeValidator] })
        });
    }

    private populateForm(): void {
        const params = this.route.snapshot?.params;
        this.edit = params?.hasOwnProperty('id');
        this.post = this.postService.getPost(params?.id);
        this.setFormControls(this.post);

        if (this.edit && !this.post) {
            const sub: Subscription = this.postService.fetchPost(params?.id)
                .subscribe((resp: Post) => {
                    this.post = {
                        _id: resp?._id,
                        title: resp?.title,
                        content: resp?.content
                    }
                    this.setFormControls(this.post);
                });
            this.destroy.push(sub);
        }
    }

    private setFormControls(post: Post): void {
        if (!post) {
            return;
        }
        this.form.patchValue({
            'title': post?.title,
            'content': post?.content
        });
        this.form.updateValueAndValidity();
    }
}
