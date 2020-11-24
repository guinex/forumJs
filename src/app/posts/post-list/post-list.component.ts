// import {Component, Input, OnInit} from '@angular/core';
import {Component, OnInit, OnDestroy} from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy{
  posts: Post[] =[];
  constructor(public postService: PostsService, private authService: AuthService) {}
  private subcribeObject: Subscription;
  public totalPost = 0;
  public postperPage = 5;
  public currentPage = 1;
  public pageSizeOptions = [5, 10];
  public authListnerSubcription: Subscription;
  public isUserAuthenticated: boolean;
  public userId: string;
  isloading = false;
  ngOnInit(){
    this.postService.getPosts(this.postperPage, this.currentPage);
    // this.postService.postListner().subscribe(callback, error, completed);
    this.isloading = true;
    this.userId =  this.authService.getUserId();
    this.subcribeObject = this.postService.postListner().subscribe((postsData: {posts: Post[], postCount: number}) => {
      this.isloading = false;
      this.totalPost = postsData.postCount;
      this.posts = postsData.posts;
    });
    this.isUserAuthenticated = this.authService.getIsAuthenticated()
    this.authListnerSubcription = this.authService.getAuthListner().subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
      this.userId =  this.authService.getUserId();
    });
  }
  ngOnDestroy(): void {
    this.subcribeObject.unsubscribe();
    this.authListnerSubcription.unsubscribe();
  }
  onDelete(postId: string){
    this.postService.deletePost(postId).subscribe(()=> {
      this.isloading = true;
      this.postService.getPosts(this.postperPage, this.currentPage);
    }, () =>{
      this.isloading = false;
    });
  }
  onChangedPage(pageData){
    this.postperPage = pageData.pageSize;
    this.currentPage = pageData.pageIndex + 1;
    this.isloading = true;
    this.postService.getPosts(this.postperPage, this.currentPage);
  }
}
