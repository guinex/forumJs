import { Injectable } from '@angular/core';
import { Post } from './post.model';
import {Subject } from 'rxjs';

// create just one instance
@Injectable({providedIn: 'root'})
export class PostsService{
  private posts: Post[]= [];
  private postsUpdated = new Subject<Post []>();

  getPosts(){
    // extract array as new array
    return [...this.posts];
  }

  postListner(){
    return this.postsUpdated.asObservable();
  }
  addPost(title: string, content: string){
    const post: Post = {title: title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
