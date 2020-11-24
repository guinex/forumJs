import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscribable, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, OnDestroy{
  public isloading = false;
  private authListner: Subscription;
  constructor(public authService: AuthService){}
  Signup(formData){
    if (formData.invalid){
      return
    }
    this.isloading = true;
    this.authService.createUser(formData.value.email, formData.value.password);
  }
  ngOnInit(){
    this.authListner = this.authService.getAuthListner().subscribe((status)=>{
        this.isloading = false;
    });
  }
  ngOnDestroy(){
    this.authListner.unsubscribe();
  }

}
