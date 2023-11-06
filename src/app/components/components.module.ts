import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FormAltaPacienteComponent } from './form-alta-paciente/form-alta-paciente.component';
import { FormAltaEspecialistaComponent } from './form-alta-especialista/form-alta-especialista.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FormAltaPacienteComponent,
    FormAltaEspecialistaComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule
  ],
  exports:[
    NavbarComponent
  ]
})
export class ComponentsModule { }
