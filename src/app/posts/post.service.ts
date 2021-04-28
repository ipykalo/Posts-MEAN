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
    private posts: Post[];

    constructor(private http: HttpClient) { }

    getPostsSub(): Observable<Post[]> {
        return this.sub.asObservable();
    }

    addPost(post: Post): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(URL, post)
    }

    deletePost(id: string): void {
        this.http.delete<{ message: string }>(`${URL}/${id}`)
            .subscribe(() => {
                this.fetchPosts();
            });
    }

    updatePost(post: Post): Observable<{ message: string }> {
        return this.http.put<{ message: string }>(`${URL}/${post._id}`, post);
    }

    getPost(id: string): Post {
        return this.posts?.find((post: Post) => post?._id === id);
    }

    fetchPost(id: string): Observable<Post> {
        return this.http.get<Post>(`${URL}/${id}`);
    }

    fetchPosts(): void {
        this.http.get<{ message: string, posts: Post[] }>(URL)
            .subscribe(resp => {
                if (resp?.posts) {
                    this.posts = resp.posts;
                    this.sub.next(resp.posts);
                }
            });
    }
}