import { Component ,ChangeDetectorRef} from '@angular/core';
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
  constructor(private _Router:Router ,public _AuthService:AuthService,private cdRef: ChangeDetectorRef){
    this._Router.events.subscribe({
      next:res=>{
        
        if(res instanceof NavigationEnd ){
          this.menuName = res.url.replace("/","")
        }
        
      }
    })
  }
 async signOut(){
    this._AuthService.user.next(null)
   console.log('before change the flag')
    this.loggedIn=false
   console.log('after change th flag');
   console.log(this.loggedIn);
   
   localStorage.removeItem('NoteToken')
   await this._Router.navigate(['/login'])
    this.cdRef.detectChanges();
  }

}
