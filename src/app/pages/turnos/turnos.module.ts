import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnosRoutingModule } from './turnos-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { TurnosComponent } from './turnos/turnos.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MisTurnosComponent,
    TurnosComponent,
    SolicitarTurnoComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    TurnosRoutingModule,
    ComponentsModule
  ]
})
export class TurnosModule { }
