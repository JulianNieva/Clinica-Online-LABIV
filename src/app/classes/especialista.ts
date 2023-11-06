export class Especialista {
    nombre:string;
    apellido:string;
    edad:number;
    dni:number;
    especialidad:string;
    mail:string;
    clave:string;
    fotoPerfil:any;
    habilitado:boolean;

    constructor(nombre: string, apellido: string, edad: number, dni: number, especialidad: string, mail: string, clave: string, fotoPerfil: any,habilitado:boolean) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.especialidad = especialidad;
        this.mail = mail;
        this.clave = clave;
        this.fotoPerfil = fotoPerfil;
        this.habilitado = habilitado;
    }
}
