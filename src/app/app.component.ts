import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Post } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Post It';

  constructor(private authService: AuthService){}
  ngOnInit(){
    this.authService.autoAuthUser();
  }
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }

}
