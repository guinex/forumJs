// import { Component, EventEmitter, Output} from '@angular/core';
import { Component} from '@angular/core';
import { NgForm } from "@angular/forms";
import { PostsService } from '../posts.service';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent{
  enteredTitle = "";
  enteredValue = "";
  // @Output() PostCreated = new EventEmitter<Post>();
  constructor(public postservice: PostsService){}

  onAddPost(form: NgForm){
    if(form.invalid){return;}
    this.postservice.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
