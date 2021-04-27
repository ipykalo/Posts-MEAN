import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "./post.model";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

const URL: string = 'http://localhost:3000/api/posts';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private http: HttpClient) { }

    addPost(post: Post): void {
        this.http.post<{ message: string }>(URL, post)
            .subscribe(resp => {
                console.log(resp.message);
            });
    }

    getPosts(): Observable<Post[]> {
        return this.http.get<{ message: string, posts: Post[] }>(URL)
            .pipe(map(resp => resp?.posts));
    }
}