import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  `
    li {
      cursor: pointer;
    }
  `
  ]
})
export class PorPaisComponent implements OnInit {

  termino :string = '';
  hayError :boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;
  
  constructor( private paisService: PaisService ) { }

  ngOnInit(): void {
  }

  buscar( termino: string ) {
    this.termino = termino;
    this.hayError = false;
    
    this.paisService.buscarPais(this.termino).subscribe( (resp) => {
      console.log(resp);

      this.paises = resp;

    }, (err) => {
      this.hayError = true;
      this.paises = [];
    });
  }

  sugerencias( termino: string ) {
    this.termino = termino;
    this.hayError = false;
    this.mostrarSugerencias = true;
    
    this.paisService.buscarPais( termino )
      .subscribe( 
        paises => this.paisesSugeridos = paises.splice(0,10),
        (err) => this.paisesSugeridos = []
      );

  }

  buscarSugerido( termino: string ) {
    this.buscar( termino );
  }
  
}
