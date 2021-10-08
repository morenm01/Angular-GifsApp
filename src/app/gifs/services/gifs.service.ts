
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root' //esto le dice que no importa donde esté en la aplicación, se va a ver en toda la aplicación desde el root, por eso no hace falta meterlo en el module
  //es decir, se crea de forma global
})
export class GifsService {

  private apiKey: string = 'HNg6Vx4eB7zkeRBdxR5zwPe28iYsh6pR'
  private _historial: string[]= [];

  //gif era el data de la interfaz SearchGifsResponse
  public resultados: Gif[]= [];

  get historial(){
    //se usa el operador spread ... para romper la referencia a la variable privada _historial
    //de forma que se pasa una copia pero no nuestra variable de esta clase, así no se puede modificar desde fuera
    return [...this._historial];
  }
  constructor(private http: HttpClient){

  }

 buscarGifs(query: string){

    //lo pasamos todo a minúsculas para que compare sin tener en cuenta esto
    query = query.trim().toLocaleLowerCase();



    /*obtenemos la interfaz de SearchGifsResponse a través de la página https://app.quicktype.io/
     Realizamos la consulta en postman, copiamos/pegamos el resultado y le indicamos que estamos usando typescript
     con el resultado nos creamos una interfaz del tipo gifs.interface.ts y ya lo podemos tipar*/

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=HNg6Vx4eB7zkeRBdxR5zwPe28iYsh6pR&q=${query}&limit=10`)
      .subscribe( (resp) => {
        console.log(resp.data);
        this.resultados= resp.data;

        //con este if vamos a evitar que se incluyan elementos repetidos con la función includes de ES6
        if((!this._historial.includes(query)) && (resp.data.length!==0)){
          this._historial.unshift(query);
          //vamos a evitar que se incluyan mas de 10 elementos, para ellos usamos slice
          this._historial = this._historial.slice(0,10);

        }

      });
  }
}
