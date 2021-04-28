import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Post } from "./post.model";
import { HttpClient } from "@angular/common/http";

const URL: string = 'http://localhost:3000/api/posts';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private sub: Subject<Post[]> = new Subject();

    constructor(private http: HttpClient) { }

    getPostsSub(): Observable<Post[]> {
        return this.sub.asObservable();
    }

    addPost(post: Post): void {
        this.http.post<{ message: string, postId: string }>(URL, post)
            .subscribe(() => this.fetchPosts());
    }

    deletePost(id: string): void {
        this.http.delete<{ message: string }>(`${URL}/${id}`)
            .subscribe(() => {
                this.fetchPosts();
            });
    }

    updatePost(post: Post): void {
        this.http.put<{ message: string }>(`${URL}/${post._id}`, post)
            .subscribe(() => {
                this.fetchPosts();
            });
    }

    fetchPosts(): void {
        this.http.get<{ message: string, posts: Post[] }>(URL)
            .subscribe(resp => {
                resp.posts && this.sub.next(resp.posts);
            });
    }
}