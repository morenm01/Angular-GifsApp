import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' //esto le dice que no importa donde esté en la aplicación, se va a ver en toda la aplicación desde el root, por eso no hace falta meterlo en el module
  //es decir, se crea de forma global
})
export class GifsService {

  private apiKey: string = 'HNg6Vx4eB7zkeRBdxR5zwPe28iYsh6pR'
  private _historial: string[]= [];

  get historial(){
    //se usa el operador spread ... para romper la referencia a la variable privada _historial
    //de forma que se pasa una copia pero no nuestra variable de esta clase, así no se puede modificar desde fuera
    return [...this._historial];
  }

  async buscarGifs(query: string){

    //lo pasamos todo a minúsculas para que compare sin tener en cuenta esto
    query = query.trim().toLocaleLowerCase();

    //con este if vamos a evitar que se incluyan elementos repetidos con la función includes de ES6
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      //vamos a evitar que se incluyan mas de 10 elementos, para ellos usamos slice
      this._historial = this._historial.slice(0,10);

    }
    const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=HNg6Vx4eB7zkeRBdxR5zwPe28iYsh6pR&q=dragon+ball+z&limit=25&offset=0&rating=g&lang=en');
    const data = await resp.json();
    console.log(data);
  }
}
