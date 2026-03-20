import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComunesService } from 'src/app/servicios/comunes.service';
import { InformesService } from 'src/app/servicios/informes.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})

export class TableroComponent implements OnInit {
mapa = {};

  constructor(private tokenService: TokenService,
    private informesService: InformesService,
    private comunes: ComunesService,
    public router: Router) { }

  ngOnInit() {

    this.obtenerInforme();

  }
  
  obtenerInforme() {
    this.informesService.getInformes()
    .subscribe( resp => {      
      this.mapa = resp;
    
   
    }

    )

   
  }

}
