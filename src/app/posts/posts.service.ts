import { Injectable } from '@angular/core';
import { Post } from './post.model';
import {Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { ThrowStmt } from '@angular/compiler';
// create just one instance

const BACKEND_URL = environment.ApiURL +'/posts/';

@Injectable({providedIn: 'root'})
export class PostsService{
  private posts: Post[]= [];
  private postsUpdated = new Subject<{posts: Post [], postCount: number}>();

  constructor(private http: HttpClient, private router: Router){};

  getPosts(postperpage: number, page: number){
    const queryParams = `?pageSize=${postperpage}&page=${page}`;
    this.http.get<{message: string, posts: any, postCount: number}>(BACKEND_URL + queryParams)
    .pipe(map((postData)=>{
      return {
        posts: postData.posts.map(post =>{
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath,
            userId: post.userId
          };
        }),
        count: postData.postCount
      };
    }))
    .subscribe((newposts)=>{
        this.posts = newposts.posts;
        this.postsUpdated.next({posts: [...this.posts], postCount: newposts.count});
    });

    // extract array as new array
    //return [...this.posts];
  }

  postListner(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string, imageFile: File){
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", imageFile, title);
    this.http.post<{message: string, post: Post}>(BACKEND_URL, postData).subscribe((response)=>{
      // console.log(response.message);/
      // const post: Post = {
      //   id: response.post.id,
      //   title: title,
      //   content: content,
      //   imagePath: response.post.imagePath
      // };
      // this.posts.push(post);
      this.router.navigate(["/" ]);
    });
  }

  updatePost(id: string, title: string, content: string, imageFile: File | string){
    let post: Post | FormData;
    if(typeof(imageFile) == "object") {
      post = new FormData();
      post.append("id", id);
      post.append("title", title);
      post.append("content", content);
      post.append("image", imageFile, title);

    }else{
      post = {id: id, title: title, content: content, imagePath: imageFile, userId: null};
    }
    this.http.put<{message: string, postId: string}>(BACKEND_URL+id, post).subscribe((response)=>{
      // const oldposts = [...this.posts];
      // const oldpostIndex = oldposts.findIndex(p => p.id == id);
      // const newpost: Post = {id: id, title: title, content: content, imagePath: ""};
      // oldposts[oldpostIndex] = newpost;
      // this.posts = oldposts;
      // this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/" ]);
    });
  }

  deletePost(postId: string){
    return this.http.delete(BACKEND_URL+ postId);
    // .subscribe(()=>{
    //   const newPosts = this.posts.filter(post => post.id !== postId);
    //   this.posts= newPosts;
    //   this.postsUpdated.next([...this.posts]);
    // })
  }
  getPost(postId: string){
    return this.http.get<{_id: string, title: string, content: string, imagePath: string, userId: string}>(BACKEND_URL+ postId);
  }
}


