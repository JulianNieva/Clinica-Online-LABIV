import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formPaciente:boolean = false;
  formEspecialista:boolean = false;


  MostrarFormPaciente() {
    this.formPaciente = true;
  }

  MostrarFormEspecialista() {
    this.formEspecialista = true;
  }

  MostrarOpcionesRegistro()
  {
    this.formPaciente = false;
    this.formEspecialista = false;
  }
}
