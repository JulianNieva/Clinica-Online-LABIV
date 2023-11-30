import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dni'
})
export class DniPipe implements PipeTransform {

  transform(dni: number, ...args: unknown[]): unknown {

    if (!isNaN(dni) && dni.toString().length === 8) {
      const dniString = dni.toString();
      const primeraParte = dniString.slice(0, 2);
      const segundaParte = dniString.slice(2, 5);
      const terceraParte = dniString.slice(5, 8);

      return `${primeraParte}.${segundaParte}.${terceraParte}`;
    } else {
      return dni.toString();
    }
  }

}
