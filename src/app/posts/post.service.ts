import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Post } from "./post.model";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private subject: Subject<Post[]> = new Subject();
    private posts: Post[] = [];

    getPostSubsciption(): Observable<Post[]> {
        return this.subject.asObservable();
    }

    addPost(post: Post): void {
        this.posts.push(post);
        this.subject.next([...this.posts]);
    }
}