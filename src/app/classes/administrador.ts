export class Administrador {
    nombre:string;
    apellido:string;
    edad:number;
    dni:number;
    mail:string;
    clave:string;
    fotoPerfil:any;

    constructor(nombre: string, apellido: string, edad: number, dni: number, mail: string, clave: string, fotoPerfil: any) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.mail = mail;
        this.clave = clave;
        this.fotoPerfil = fotoPerfil;
    }
}
