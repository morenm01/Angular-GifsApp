import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent{

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  buscar(){
    console.log(this.txtBuscar.nativeElement.value);

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
