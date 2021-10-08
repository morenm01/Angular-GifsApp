import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' //esto le dice que no importa donde esté en la aplicación, se va a ver en toda la aplicación desde el root, por eso no hace falta meterlo en el module
  //es decir, se crea de forma global
})
export class GifsService {

  private _historial: string[]= [];

  get historial(){
    //se usa el operador spread ... para romper la referencia a la variable privada _historial
    //de forma que se pasa una copia pero no nuestra variable de esta clase, así no se puede modificar desde fuera
    return [...this._historial];
  }

  buscarGifs(query: string){

    this._historial.unshift(query);
    console.log(this._historial);
  }
}
