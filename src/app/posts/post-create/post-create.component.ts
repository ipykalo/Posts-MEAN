import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
    title: string = '';
    content: string = '';
    @Output() postCreated: EventEmitter<object> = new EventEmitter();

    onAddPost() {
        const post: object = { title: this.title, content: this.content };
        this.postCreated.emit(post);
    }
}
