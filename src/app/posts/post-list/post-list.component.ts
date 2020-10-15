// import {Component, Input, OnInit} from '@angular/core';
import {Component, OnInit, OnDestroy} from '@angular/core';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy{
  posts: Post[] =[];
  constructor(public postService: PostsService) {}
  private subcribeObject: Subscription;
  ngOnInit(){
    this.postService.getPosts();
    // this.postService.postListner().subscribe(callback, error, completed);
    this.subcribeObject = this.postService.postListner().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
  ngOnDestroy(): void {
    this.subcribeObject.unsubscribe();
  }
}
