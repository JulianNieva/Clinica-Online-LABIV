import { Component,Input} from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-form-alta-especialista',
  templateUrl: './form-alta-especialista.component.html',
  styleUrls: ['./form-alta-especialista.component.scss']
})
export class FormAltaEspecialistaComponent {
  @Input() especialidad?: any;
  //@ts-ignore
  formEspecialista: FormGroup;
  textoEspecialidades: string = "";
  imagenes:string[]
 
  constructor(private fb: FormBuilder,private swal:SwalService) { 
    this.imagenes = [];
  }

ngOnInit() {
    this.formEspecialista = this.fb.group({
      nombre: ['',[Validators.required,Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]*$/)]],
      apellido: ['',[Validators.required,Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]*$/)]],
      edad: ['',[Validators.required]],
      dni: ['',[Validators.required,Validators.pattern('^[0-9]+$')]],
      especialidad: ['', [Validators.required]],
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

    if (files.length !== 1) {
      this.swal.MostrarError("ERROR","Debe subir 1 imágen")
      return;
    }

    this.imagenes = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageUrl = URL.createObjectURL(file);
      this.imagenes.push(imageUrl);
    }
  }

  addEspecialidad() {
    if (this.formEspecialista.getRawValue().especialidad == '') {
      this.especialidad = true;
    } else {
      this.especialidad = false;
    }
  }

  clickListado($event: any) {
    //@ts-ignore
    this.textoEspecialidades = $event.map((especialidad) => especialidad.nombre).join(' - ');
    this.especialidad = $event;
  }

}
