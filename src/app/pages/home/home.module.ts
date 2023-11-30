import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { SeccionUsuariosComponent } from './seccion-usuarios/seccion-usuarios.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PacientesComponent } from './pacientes/pacientes.component';
import { InformesComponent } from './informes/informes.component';

@NgModule({
  declarations: [
    WelcomeComponent,
    ErrorComponent,
    SeccionUsuariosComponent,
    MiPerfilComponent,
    PacientesComponent,
    InformesComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
