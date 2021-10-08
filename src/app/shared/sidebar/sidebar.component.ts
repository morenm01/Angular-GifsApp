import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',

})
export class SidebarComponent{


  get historial(){
    return this.gifsService.historial;
  }
  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  buscar_historial(query: string){
    this.gifsService.buscarGifs(query);
  }

}
