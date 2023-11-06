export class Paciente {
    nombre:string;
    apellido:string;
    edad:number;
    dni:number;
    obraSocial:string;
    mail:string;
    clave:string;
    fotos:any;

    constructor(nombre: string, apellido: string, edad: number, dni: number, obraSocial: string, mail: string, clave: string, fotos: any) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.obraSocial = obraSocial;
        this.mail = mail;
        this.clave = clave;
        this.fotos = fotos;
    }
}
