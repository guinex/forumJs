// import { Component, EventEmitter, Output} from '@angular/core';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { mimeType } from "./mime-type.validator";
import { Subscription } from 'rxjs';
import {AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy{
  // enteredTitle = "";
  // enteredValue = "";
  // @Output() PostCreated = new EventEmitter<Post>();
  post: Post;
  isloading = false;
  form: FormGroup;
  imagePreviewUrl = null;
  private route_mode = 'create';
  private postId: string;
  private authListner: Subscription;

  constructor(public postservice: PostsService, public route: ActivatedRoute, private authService: AuthService){}

  // paramMap is observable
  ngOnInit(){
    this.authListner = this.authService.getAuthListner().subscribe((status)=>{
      if(status){
        this.isloading = false;
      }
    });
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null, {validators: [Validators.required]}),
      imageFile: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });
    this.route.paramMap.subscribe((paramMap) => {
      console.log("onInit");
      if (paramMap.has('postId')){
        console.log("post edit mode");
        this.route_mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isloading = true;
        this.postservice.getPost(this.postId).subscribe((postData)=>{
          this.isloading = false;
          this.post = {id: postData._id, title: postData.title, content: postData.content, imagePath: postData.imagePath, userId: postData.userId}
          this.form.setValue(
            {
              title: this.post.title,
              content: this.post.content,
              imageFile: this.post.imagePath
            });
        });
      }
      else{
        console.log("post create mode");
        this.route_mode = 'create';
        this.postId = null;
      }
    });
  };
  isEditMode(){
    return this.route_mode == "edit";
  }
  onAddPost(){
    if(this.form.invalid){return;}
    if (this.route_mode == 'edit'){
      console.log(this.form);
      this.postservice.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.imageFile);
      console.log("post edit mode");
    }else{
      this.isloading = true;
      console.log("post create mode");
      this.postservice.addPost(this.form.value.title, this.form.value.content, this.form.value.imageFile);
    }
    this.form.reset();
  }
  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    this.form.patchValue({imageFile: file});
    this.form.get('imageFile').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewUrl = reader.result
    };
    reader.readAsDataURL(file);
  }
  ngOnDestroy(){
    this.authListner.unsubscribe();
  }
}
