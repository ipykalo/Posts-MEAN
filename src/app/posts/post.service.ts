import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Post } from "./post.interface";

const URL: string = 'http://localhost:3000/api/posts';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private posts: Post[];

    constructor(private http: HttpClient) { }

    getPosts(pageSize: number, page: number): Observable<{ posts: Post[], totalPosts: number }> {
        return this.fetchPosts(pageSize, page);
    }

    getPost(id: string): Post {
        return this.posts?.find((post: Post) => post?._id === id);
    }

    addPost(post: Post): Observable<{ message: string }> {
        const formData = this.getFormData(post);
        return this.http.post<{ message: string }>(URL, formData)
    }

    deletePost(id: string): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${URL}/${id}`);
    }

    updatePost(post: Post): Observable<{ message: string }> {
        const formData = this.getFormData(post);
        formData.append('_id', post?._id);
        return this.http.put<{ message: string }>(`${URL}/${post._id}`, formData);
    }

    fetchPost(id: string): Observable<Post> {
        return this.http.get<Post>(`${URL}/${id}`);
    }

    private fetchPosts(pageSize: number, page: number): Observable<{ posts: Post[], totalPosts: number }> {
        let query: string = '';
        if ((pageSize || pageSize === 0) && (page || page === 0)) {
            query = `?pageSize=${pageSize}&page=${page}`;
        }

        return this.http.get<{ message: string, posts: Post[], totalPosts: number }>(`${URL}${query}`)
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
        return formData;
    }
}