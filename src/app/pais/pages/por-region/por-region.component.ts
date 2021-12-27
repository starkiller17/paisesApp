import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
  `
    button {
      margin-right: 5px;
    }
  `
  ]
})
export class PorRegionComponent implements OnInit {
  regiones: string [] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';

  termino :string = '';
  hayError :boolean = false;
  paises: Country[] = [];
  
  constructor( private paisService: PaisService ) { }

  activarRegion( region: string ) {
    if( region == this.regionActiva ) { return };
    this.regionActiva = region;
    this.hayError = false;
    this.paises = [];

    this.paisService.buscarRegion(this.regionActiva).subscribe( (resp) => {
      console.log(resp);
      this.paises = resp;

    }, (err) => {
      this.hayError = true;
      this.paises = [];
    });
  }

  getClaseCSS( region: string ) {
    return (region === this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary'
  }

  ngOnInit(): void {
  }

  sugerencias( termino: string ) {
    this.hayError = false;
    //this.buscar(termino);
  }

}
