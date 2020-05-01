import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html'
})
export class PostCreateComponent{
  content = '';
  placeholder = 'enter here';
  onAddPost(){
    this.content = 'asdasd';
  }
}
