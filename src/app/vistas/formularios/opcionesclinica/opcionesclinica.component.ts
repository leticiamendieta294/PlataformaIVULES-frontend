import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LaboratorioModelo } from 'src/app/modelos/laboratorio.modelo';
import { OpcionesClinicaModelo } from 'src/app/modelos/opcionesclinica.modelo';
import { PersonaModelo } from 'src/app/modelos/persona.modelo';
import { ComunesService } from 'src/app/servicios/comunes.service';
import { LaboratorioService } from 'src/app/servicios/laboratorio.service';
import { OpcionesClinicaService } from 'src/app/servicios/opcionesclinica.service';
import { PersonasService } from 'src/app/servicios/personas.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-opcionesclinica',
  templateUrl: './opcionesclinica.component.html',
  styleUrls: ['./opcionesclinica.component.css']
})
export class OpcionesClinicaComponent implements OnInit {
  crear = false;

  opcionesClinicas: OpcionesClinicaModelo[] = [];
  laboratorioUrocultivo: LaboratorioModelo[] = [];;
  personaForm: FormGroup;
  private test1;

  bntStyle: string;

  existe = false;

  urocultivoPositivo = false;

  opciones = [];
  opcionesLaboratorioUP= [];
  opcionesLaboratorio = [];

  constructor(
    private tokenService: TokenService,
             
               private opcionesClinicaService: OpcionesClinicaService,
             
               private comunes: ComunesService,
             
    private router: Router,
    private route: ActivatedRoute) {
      
     }

  ngOnInit(): void {
    
     const id = this.route.snapshot.paramMap.get('id');


    this.obtenerOpcionesClinica(id)

    this.obtenerOpcionesClinicaLaboratorio(id)

    this.obtenerOpcionesClinicaLaboratorioUrocultivo(id)

   


   
  }


   obtenerOpcionesClinica(id){


    this.opcionesClinicaService.getOpcionesClinicas(id)
    .subscribe( resp => {      
      this.opcionesClinicas = resp;
      this.opciones =  resp;
   
    }

    )

   




  }

  obtenerOpcionesClinicaLaboratorioUrocultivo(id){

    this.opcionesClinicaService.getOpcionesUrocultivo(id)
    .subscribe( resp => {      
      this.opcionesLaboratorioUP =  resp;

      if (this.opcionesLaboratorioUP.length!=0) {
        this.urocultivoPositivo = true;
      }
   
    }

    )


   




  }


  

  obtenerOpcionesClinicaLaboratorio(id){


    this.opcionesClinicaService.getOpcionesClinicasLaboratorio(id)
    .subscribe( resp => {      
      this.opcionesClinicas = resp;
      this.opcionesLaboratorio =  resp;
  
    }

    )

   




  }


  cuestionariobasal(event) {
    event.preventDefault();
    this.router.navigate(['inicio/cuestionariobasal', this.route.snapshot.paramMap.get('id') ]);
  }
  
  
  seguimiento(event,nro) {
    event.preventDefault();
    this.router.navigate(['inicio/seguimiento/ver',this.route.snapshot.paramMap.get('id'),nro]);
  }


  laboratorio(event,nro) {
    event.preventDefault();
    this.router.navigate(['inicio/laboratorios/ver',this.route.snapshot.paramMap.get('id'),nro]);
  }

}


