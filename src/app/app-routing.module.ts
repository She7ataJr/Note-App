import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageLayoutComponent } from './layouts/home-page-layout/home-page-layout.component';
import { HomeComponent } from './components/home/home.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path:'',
  canActivate:[authGuard],
  component:HomePageLayoutComponent,
  children:[
    {path:'home',component:HomeComponent,title:"Home"}
  ]},
  {path:'',component:AuthLayoutComponent,children:[
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent,title:'Login'},
    {path:'register',component:RegisterComponent,title:'Register'}
  ]},
  {path:"**",component:NotFoundComponent,title:"NotFound"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
