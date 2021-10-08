import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent{

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService){}

  buscar(){

    const valor = this.txtBuscar.nativeElement.value;

    //vamos a evitar que se incluyan vacíos en nuestro array
    //Usamos trim para quitar espacios deltante y detrás y comprobamos la longitud

    if(valor.trim().length===0)
    return;
    //console.log(valor);
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value="";
  }

  //si sacamos por la consola txtBuscar nos indica que el tipo es ElementRef
  //ponemos el ! para indicar que ese elemento siempre va a tener algo, no va a ser nulo
  //https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator

  /*Para ver los eventos
  buscar(event: KeyboardEvent){
    console.log(event);
}*/

}
