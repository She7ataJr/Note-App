import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  NoteToken:any
  loggedIn:boolean=true
  menuName:string="Login"
  constructor(private _Router:Router ,public _AuthService:AuthService){
    this._Router.events.subscribe({
      next:res=>{
        
        if(res instanceof NavigationEnd ){
          this.menuName = res.url.replace("/","")
        }
        
      }
    })
  }
  signOut(){
    this._AuthService.user.next(null)
   
    this.loggedIn=false
   
    localStorage.removeItem('NoteToken')
    this._Router.navigate(['/login'])
  }

}
