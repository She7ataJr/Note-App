import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable,BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  NoteToken :any
  constructor(private _httpClient:HttpClient,private _Router:Router) {
    this.userData()
   }
  user:BehaviorSubject<any> = new BehaviorSubject(null)
  
  register(formData:object):Observable<any>{
    return this._httpClient.post(environment.baseUrl+'signup',formData)
  }

  login(formData:object):Observable<any>{
    return this._httpClient.post(environment.baseUrl+'signin',formData)
  }
 
  userData():void{
    const token = localStorage.getItem("NoteToken")
    if(token !== null){

      const tokenDecode = jwtDecode(token)
      this.user.next(tokenDecode)
      this._Router.navigate(['/home'])
    }
  }
}
