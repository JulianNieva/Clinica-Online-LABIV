import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor() 
  { }

  CerrarSesion()
  {
    Swal.fire({
      title:"ATENCIÓN",
      text: "¿Estas seguro que desea cerrar la sesion?",
      showCancelButton: true,
      confirmButtonText: 'Salir',
      confirmButtonColor: "red",
      cancelButtonText:"Cancelar",
      cancelButtonColor:"blue",
      icon:"question"
    }).then((res) => {
      if(res.isConfirmed){
        //this.userService.SignOut()
      }
      else{
        Swal.fire('Se cancelo la operación', '', 'info')
      }
    })
  }
}
