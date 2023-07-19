import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


export const authGuard : CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree =>{
    const _AuthService= inject(AuthService)
    const _Router = inject(Router)
            if(_AuthService.user.getValue()!= null){
              return true
            }else{ 
              _Router.navigate(['/login'])
              return false
            }

}