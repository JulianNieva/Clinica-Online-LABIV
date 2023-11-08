import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private angularFirestore:AngularFirestore) { }

  TraerEspecialidades()
  {
    return this.angularFirestore.collection('especialidades').valueChanges()
  }

  GuardarEspecialidad(especialidades:any)
  {
    const documento = this.angularFirestore.doc('especialidades/' + this.angularFirestore.createId());
    const uid = documento.ref.id;

    documento.set({
      uid: uid,
      nombre: especialidades
    });
  }
}
