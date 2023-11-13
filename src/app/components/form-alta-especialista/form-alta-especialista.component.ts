import { Component,Input} from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Usuario } from 'src/app/classes/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
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
  nuevoEspecialista = new Usuario()
  loading = false
 
  constructor(private fb: FormBuilder,private swal:SwalService,private storageService:StorageService,private authService:AuthService) { 
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

  async Registrar() {
    if(this.formEspecialista.valid && this.imagenes.length == 1)
    {
      this.loading = true
      const urls = await this.storageService.SubirImagenes(this.nuevoEspecialista.dni.toString(),this.imagenes,"especialistas")
      this.nuevoEspecialista.nombre = this.formEspecialista.getRawValue().nombre;
      this.nuevoEspecialista.apellido = this.formEspecialista.getRawValue().apellido;
      this.nuevoEspecialista.edad = this.formEspecialista.getRawValue().edad;
      this.nuevoEspecialista.dni = this.formEspecialista.getRawValue().dni;
      this.nuevoEspecialista.especialidad = this.formEspecialista.getRawValue().especialidad;
      this.nuevoEspecialista.email = this.formEspecialista.getRawValue().email;
      this.nuevoEspecialista.password = this.formEspecialista.getRawValue().clave;
      this.nuevoEspecialista.perfil = "Especialista"
      this.nuevoEspecialista.fotos = urls
      this.authService.registerUsuario(this.nuevoEspecialista)
      setTimeout(() => {
        this.loading = false;
        this.formEspecialista.reset();
        this.nuevoEspecialista = new Usuario();
      }, 2000);
    }
    else {
      this.swal.MostrarError('ERROR','¡Asegurese de completar el formulario correctamente!');
    }
    this.loading = false
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
