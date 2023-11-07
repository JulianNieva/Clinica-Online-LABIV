import { Component,EventEmitter,Output } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-form-alta-paciente',
  templateUrl: './form-alta-paciente.component.html',
  styleUrls: ['./form-alta-paciente.component.scss']
})
export class FormAltaPacienteComponent {
  
  //@ts-ignore
  formPaciente: FormGroup;
  imagenes:string[]

  constructor(private fb: FormBuilder,private swal:SwalService) { 
    this.imagenes = [];
  }

  ngOnInit() {
    this.formPaciente = this.fb.group({
      nombre: ['',[Validators.required,Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]*$/)]],
      apellido: ['',[Validators.required,Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]*$/)]],
      edad: ['',[Validators.required]],
      dni: ['',[Validators.required,Validators.pattern('^[0-9]+$')]],
      obraSocial: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      clave: ['',[Validators.required,Validators.minLength(6)]],
      foto:['',Validators.required]
    });
  }

  Registrar() {
    console.log("Hola")
  }

  handleFileInputChange(event: any) {
    const files: FileList = event.target.files;

    if (files.length !== 2) {
      this.swal.MostrarError("ERROR","Debe subir 2 imagenes")
      return;
    }

    this.imagenes = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageUrl = URL.createObjectURL(file);
      this.imagenes.push(imageUrl);
    }
  }
}
