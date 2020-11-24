import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  private authListnerSubscription: Subscription;
  public isAuthenticated: boolean = false;

  constructor(private authService: AuthService){

  }
  ngOnInit(){
    this.isAuthenticated = this.authService.getIsAuthenticated();
    this.authListnerSubscription = this.authService.getAuthListner().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }
  onLogout(){
    this.authService.logout();
  }
}

