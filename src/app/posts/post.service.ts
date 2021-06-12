import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Post } from "./post.interface";
import { Helper } from "../classes/helper";
import { URLS } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private posts: Post[];

    constructor(private http: HttpClient) { }

    getPosts(pageSize: number, page: number): Observable<{ posts: Post[], totalPosts: number }> {
        return this.fetchPosts(pageSize, page)
            .pipe(
                catchError(() => of(null))
            );
    }

    getPost(id: string): Post {
        return this.posts?.find((post: Post) => post?._id === id);
    }

    addPost(post: Post): Observable<{ message: string }> {
        const formData = this.getFormData(post);
        return this.http.post<{ message: string }>(Helper.url(URLS.CREATE_POST), formData)
            .pipe(catchError(() => of(null)));
    }

    deletePost(id: string): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(Helper.url(URLS.DELETE_POST, id))
            .pipe(catchError(err => of(null)));
    }

    updatePost(post: Post): Observable<{ message: string }> {
        const formData = this.getFormData(post);
        formData.append('_id', post?._id);
        return this.http.put<{ message: string }>(Helper.url(URLS.UPDATE_POST, post?._id), formData)
            .pipe(catchError(() => of(null)));
    }

    fetchPost(id: string): Observable<Post> {
        return this.http.get<Post>(Helper.url(URLS.FETCH_POST, id));
    }

    private fetchPosts(pageSize: number, page: number): Observable<{ posts: Post[], totalPosts: number }> {
        return this.http.get<{ message: string, posts: Post[], totalPosts: number }>(
            Helper.url(URLS.FETCH_POSTS, pageSize, page)
        )
            .pipe(
                map(resp => {
                    this.posts = resp?.posts;
                    return { posts: this.posts, totalPosts: resp?.totalPosts };
                })
            );
    }

    private getFormData(post: Post): FormData {
        const formData = new FormData();
        formData.append('title', post?.title);
        formData.append('content', post?.content);
        formData.append('image', post?.image);
        formData.append('path', post?.path);
        return formData;
    }
}