import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Post } from "./post.model";
import { HttpClient } from "@angular/common/http";

const URL: string = 'http://localhost:3000/api/posts';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private posts: Post[];

    constructor(private http: HttpClient) { }

    getPosts(): Observable<Post[]> {
        return this.fetchPosts();
    }

    getPost(id: string): Post {
        return this.posts?.find((post: Post) => post?._id === id);
    }

    addPost(post: Post): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(URL, post)
    }

    deletePost(id: string): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${URL}/${id}`);
    }

    updatePost(post: Post): Observable<{ message: string }> {
        return this.http.put<{ message: string }>(`${URL}/${post._id}`, post);
    }

    fetchPost(id: string): Observable<Post> {
        return this.http.get<Post>(`${URL}/${id}`);
    }

    private fetchPosts(): Observable<Post[]> {
        return this.http.get<{ message: string, posts: Post[] }>(URL)
            .pipe(
                map(resp => this.posts = resp?.posts)
            );
    }
}