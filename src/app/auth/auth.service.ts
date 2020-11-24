import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.ApiURL +'/users/';
@Injectable({ providedIn: "root"})

export class AuthService{
  private tokenTimer: any;
  constructor(private http: HttpClient, private router: Router){}
  private token: string;
  private authListner =  new Subject<boolean>();
  private isAuthenticated: boolean = false;
  private userId: string;
  createUser(email: string, password: string){
    console.log("password"+ password);
    const authData: AuthData = {email : email, password: password};
    this.http.post<{token: string}>(BACKEND_URL + "signup", authData).subscribe(response => {
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.authListner.next(false);
    });
  }

  login(email: string, password: string){
    const authData: AuthData = {email : email, password: password};
    this.http.post<{token: string, expiresIn: number, userId: string}>(BACKEND_URL + "login", authData).subscribe(response => {
      // console.log(response);
      const token = response.token;
      if(token){
        this.isAuthenticated = true;
        this.token = token;
        this.userId = response.userId;
        const expirationDuration = response.expiresIn;
        this.setAuthTimer(expirationDuration);
        this.authListner.next(true);
        const now = new Date();
        const expirationTime = new Date(now.getTime() + expirationDuration * 1000);
        this.saveAuthData(token, expirationTime, response.userId);
        this.router.navigate(['/']);
      }else{
        // throw error
      }
    }, error=>{
      this.authListner.next(false);
    });
  }

  getUserId(){
    return this.userId;
  }

  autoAuthUser(){
    const authData = this.getAuthData();
    if (!authData){ return; }
    const now = new Date();
    const expiresIn = authData.expirationDate.getTime() -  now.getTime();
    if(expiresIn > 0){
      this.token = authData.token;
      this.isAuthenticated = true;
      this.userId = authData.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authListner.next(true);
    }
  }

  getToken(){
    return this.token;
  }
  getIsAuthenticated(){
    return this.isAuthenticated;
  }
  getAuthListner(){
    return this.authListner.asObservable();
  }
  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authListner.next(false);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.userId =  null;
    this.router.navigate(['/']);
  }
  private saveAuthData(token: string, expirationDate: Date, userId: string){
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    //save date too
  }
  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem('userId');
  }
  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    const userId = localStorage.getItem('userId');
    if(!token || !expirationDate){
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }
  private setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(()=>{
      this.logout();
    }, duration * 1000);

  }
}
