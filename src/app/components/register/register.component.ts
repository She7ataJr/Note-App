import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;

  constructor(private _FormBuilder:FormBuilder,
              private _AuthService:AuthService,
              private _Router:Router,
              private _toaster:ToastrService
              ){}
  ngOnInit(): void {
    this.CreateForm()
  }
  
  registerForm!:FormGroup
  CreateForm():void{
    this.registerForm=this._FormBuilder.group({
      first_name:['',Validators.required],
      last_name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      age:['',Validators.required]
    })
  }
  register(formData:FormGroup):void{
    console.log(formData.value);
    if(formData.valid){
      this._AuthService.register(formData.value).subscribe({
        next:response=>{
          console.log(response);
          if(response.message==="success"){
            this._Router.navigate(['/login'])
          }else{
            this._toaster.warning(response.errors.email.message,"Error")
          }
          
        }
      })
    }
    
  }
}
