import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  constructor(private _FormBuilder:FormBuilder,
              private _AuthService:AuthService,
              private _Router:Router,
              private _toaster:ToastrService
              ){}
  ngOnInit(): void {
    this.CreateForm()
  }
  
  loginForm!:FormGroup
  CreateForm():void{
    this.loginForm=this._FormBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }
  login(formData:FormGroup):void{
   if(formData.valid){
    this._AuthService.login(formData.value).subscribe({
      next:(res)=>{
        if(res.message === 'success'){
          console.log(res);
          localStorage.setItem("NoteToken",res.token)
          this._AuthService.userData()
          this._Router.navigate(['/home'])
        }else{
          this._toaster.warning(res.message,'Error')
        }
      }

    })
   }
    
  }

}
