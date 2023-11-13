import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private angularFireStorage:AngularFireStorage) { }


  async SubirImagenes(dni:string, files:any, perfil:any)
  {
    const urls:any[] = []
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const path = `${perfil}/img_${i}_${dni}_${new Date().getDate()}_${new Date().getMonth()}_${new Date().getFullYear()}_${new Date().toLocaleTimeString()}`;
        const foto = files[i];
        const imgRef = this.angularFireStorage.ref(path);
        const task = await imgRef.put(foto)
        const urlImg = await task.ref.getDownloadURL();
        urls.push(urlImg)
      }
    }
    return urls;
  }
}
