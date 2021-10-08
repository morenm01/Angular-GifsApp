
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root' //esto le dice que no importa donde esté en la aplicación, se va a ver en toda la aplicación desde el root, por eso no hace falta meterlo en el module
  //es decir, se crea de forma global
})
export class GifsService {

  private apiKey: string = 'HNg6Vx4eB7zkeRBdxR5zwPe28iYsh6pR';
  private servicioURL: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[]= [];

  //gif era el data de la interfaz SearchGifsResponse
  public resultados: Gif[]= [];

  get historial(){
    //se usa el operador spread ... para romper la referencia a la variable privada _historial
    //de forma que se pasa una copia pero no nuestra variable de esta clase, así no se puede modificar desde fuera
    return [...this._historial];
  }
  constructor(private http: HttpClient){
    this._historial= JSON.parse(localStorage.getItem('historial')!) || [];
    /*if(localStorage.getItem('historial')){
      this._historial= JSON.parse(localStorage.getItem('historial')!);
    }*/
    this.resultados=JSON.parse(localStorage.getItem('resultados')!) || [];
  }

 buscarGifs(query: string){

    //lo pasamos todo a minúsculas para que compare sin tener en cuenta esto
    query = query.trim().toLocaleLowerCase();


  //HttpParams es un objeto de angular
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit',10)
      .set('q', query);

      console.log(params.toString());

    // se pondría params: params pero en ECM6 poner una variable cuyo tipo tiene el mismo nombre es redundante, se puede dejar solo con el nombre de la variable
    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, { params})
      .subscribe( (resp) => {
        console.log(resp.data);
        this.resultados= resp.data;

        //con este if vamos a evitar que se incluyan elementos repetidos con la función includes de ES6
        if((!this._historial.includes(query)) && (resp.data.length!==0)){
          this._historial.unshift(query);
          //vamos a evitar que se incluyan mas de 10 elementos, para ellos usamos slice
          this._historial = this._historial.slice(0,10);

         // localStorage.setItem('historial', query);
         localStorage.setItem('historial', JSON.stringify(this._historial));
         //console.log(this.resultados);
         localStorage.setItem('resultados', JSON.stringify(this.resultados));

        }

      });
  }
}
