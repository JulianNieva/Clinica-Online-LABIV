import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../classes/usuario';
import { SwalService } from './swal.service';
import { Router } from '@angular/router';
import { switchMap,of } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: any;
  esAdmin: boolean = false;
  seLogueo: boolean = false;
  usuarioLogueado: any;

  constructor(
    private angularFirestore: AngularFirestore,
    private swal: SwalService,
    private router: Router,
    private afAuth: AngularFireAuth) 
    {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user: any) => {
          if (user) {
            return this.angularFirestore.doc<Usuario>(`usuarios/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );
    }

    async Login(email: string, password: string) {
      return this.afAuth.signInWithEmailAndPassword(email,password)
    }

    registerUsuario(nuevoUsuario: Usuario) {
      console.log("Entre 1")
      var config = {
        apiKey: "AIzaSyBeQCqlXZ7Ocrjwrux1Y5IyWqxPHaUHpr4",
        authDomain: "clinicaonline-f8262.firebaseapp.com",
        projectId: "clinicaonline-f8262",
        storageBucket: "clinicaonline-f8262.appspot.com",
        messagingSenderId: "555095323499",
        appId: "1:555095323499:web:6911001a4b1b0f4264522e"
      };
      const secondaryApp = firebase.initializeApp(config, "Secondary");
      console.log("Entre 2 luego de crear la 2da app de firebase")

      secondaryApp.auth().createUserWithEmailAndPassword(nuevoUsuario.email, nuevoUsuario.password)
        .then((data: any) => {
          console.log("Entre 3 luego de crear la cuenta")
          const uid = data.user?.uid;
          const documento = this.angularFirestore.doc('usuarios/' + uid);
          console.info(nuevoUsuario)
          documento.set({
            id: uid,
            perfil: nuevoUsuario.perfil,
            nombre: nuevoUsuario.nombre,
            apellido: nuevoUsuario.apellido,
            edad: nuevoUsuario.edad,
            dni: nuevoUsuario.dni,
            obraSocial: nuevoUsuario.obraSocial,
            especialidad: nuevoUsuario.especialidad,
            email: nuevoUsuario.email,
            password: nuevoUsuario.password,
            fotos:nuevoUsuario.fotos,
            aprobado: nuevoUsuario.aprobado,
          })
            .then(() => {
              console.log("Se guardo en la BD")
              data.user.sendEmailVerification();
              this.swal.MostrarExito("¡Registro exitoso!","Por favor, verifique su correo electrónico para activar su cuenta");
            })
            .catch((error) => {
              console.log("No se creo el usuario en la BD")
              this.swal.MostrarError("ERROR",this.ObtenerMensajeError(error.code));
            })
            .finally(() => {
              console.log("Cierro la nueva sesión")
              secondaryApp.auth().signOut();
              secondaryApp.delete();
            });
        })
        .catch((error: any) => {
          console.log("Entre 4 Por algo no creo la cuenta")
          this.swal.MostrarError("ERROR",this.ObtenerMensajeError(error.code));
        });
    }

    Logout() {
      this.afAuth.signOut().then(() =>{
        this.seLogueo = false;
        this.esAdmin = false;
      }).catch((error) => {
        this.swal.MostrarError("¡ERROR!",this.ObtenerMensajeError(error.errorCode))
        console.log(error)
      })
    }

    ActualizarUsuario(usuario: any) {
      this.angularFirestore
        .doc<any>(`usuarios/${usuario.id}`)
        .update(usuario)
        .then(() => { })
        .catch((error) => {
          this.swal.MostrarError('Ocurrio un error', 'Administrador');
        });
    }

    ObtenerMensajeError(errorCode: string): string {

      let mensaje: string = '';
  
      switch (errorCode) {
        case 'auth/operation-not-allowed':
          mensaje = 'La operación no está permitida.';
          break;
        case 'auth/email-already-in-use':
          mensaje = 'El email ya está registrado.';
          break;
        case 'auth/invalid-email':
          mensaje = 'El email no es valido.';
          break;
        case 'auth/wrong-password':
          mensaje = 'La contraseña es inválida';
          break;
        case 'auth/invalid-login-credentials':
          mensaje = "No se encontro el usuario"
          break;
        default:
          mensaje = 'Se produjo un error';
          break;
      }
      return mensaje;
    } 
}
