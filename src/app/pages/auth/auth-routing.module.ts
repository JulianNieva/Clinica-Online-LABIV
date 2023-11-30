import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { animation } from '@angular/animations';

const routes: Routes = [
  {
    path:"login",
    component:LoginComponent,
    data: {animation: 'Login'}

  },
  {
    path:"register",
    component:RegisterComponent,
    data: {animation: 'Registro'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
