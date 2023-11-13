import { Component, OnInit } from '@angular/core';
import { take,map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  usuario:any

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((user:any) => {
      if(user){
        this.usuario = user
      }
      else{
        this.usuario = null
      }
    }) 
  }

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
        this.authService.Logout()
      }
      else{
        Swal.fire('Se cancelo la operación', '', 'info')
      }
    })
  }
}
