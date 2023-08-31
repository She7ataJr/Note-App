import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  NoteToken: any
  menuName: string = "Login"
  islogin!: boolean
  constructor(private _Router: Router, public _AuthService: AuthService) {
    this._AuthService.user.subscribe((res) => {
      if (res) {
        this.islogin = true
      } else {
        this.islogin = false
      }
    })
    this._Router.events.subscribe({
      next: res => {

        if (res instanceof NavigationEnd) {
          this.menuName = res.url.replace("/", "")
        }

      }
    })
  }
  signOut() {
    this._AuthService.user.next(null)
    localStorage.removeItem('NoteToken')
    this._Router.navigate(['/login'])
  }

}
