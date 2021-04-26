import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Post } from "./post.model";
import { HttpClient } from "@angular/common/http";
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private subject: Subject<Post[]> = new Subject();
    private posts: Post[] = [];

    constructor(private http: HttpClient) { }

    addPost(post: Post): void {
        this.posts.push(post);
        this.subject.next([...this.posts]);
    }

    getPosts(): Observable<Post[]> {
        return this.http.get<{ message: string, posts: Post[] }>('http://localhost:3000/api/posts')
            .pipe(map(resp => resp?.posts));
    }
}