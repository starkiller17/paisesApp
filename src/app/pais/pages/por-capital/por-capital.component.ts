import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent implements OnInit {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor( private paisService: PaisService) { }

  ngOnInit(): void {
  }

  buscar( termino: string ) {
    this.termino = termino;
    this.hayError = false;
    
    this.paisService.buscarCapital(this.termino).subscribe( (resp) => {
      this.paises = resp;
    }, (err) => {
      this.hayError = true;
      this.paises = [];
    });
  }
}
