import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy{
  public isloading = false;
  private authListner: Subscription;
  constructor(public authService: AuthService){}

  ngOnInit(){
    this.authListner = this.authService.getAuthListner().subscribe((status)=>{
        this.isloading = false;
    });

  }
  ngOnDestroy(){
    this.authListner.unsubscribe();
  }
  login(formData){
    if(formData.invalid){
      return;
    }
    this.isloading = true;
    this.authService.login(formData.value.email, formData.value.password);
  }

}
