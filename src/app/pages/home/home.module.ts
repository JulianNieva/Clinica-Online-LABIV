import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    WelcomeComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
