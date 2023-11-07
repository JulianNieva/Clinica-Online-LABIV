import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FormAltaPacienteComponent } from './form-alta-paciente/form-alta-paciente.component';
import { FormAltaEspecialistaComponent } from './form-alta-especialista/form-alta-especialista.component';
import { FormAltaAdministradorComponent } from './form-alta-administrador/form-alta-administrador.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NavbarComponent,
    FormAltaPacienteComponent,
    FormAltaEspecialistaComponent,
    FormAltaAdministradorComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    NavbarComponent,
    FormAltaEspecialistaComponent,
    FormAltaPacienteComponent,
    FormAltaAdministradorComponent
  ]
})
export class ComponentsModule { }
