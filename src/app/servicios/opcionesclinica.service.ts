import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { HttpParams } from "@angular/common/http";
import { GlobalConstants } from '../common/global-constants';
import { OpcionesClinicaModelo } from '../modelos/opcionesclinica.modelo';

@Injectable({
  providedIn: 'root'
})
export class OpcionesClinicaService {

  private url = GlobalConstants.apiUrlBackend;

  constructor( private http: HttpClient ) { }


  crearOpcionesClinica( opcionesclinica: OpcionesClinicaModelo ) {

    return this.http.post(`${ this.url }/opcionesclinica`, opcionesclinica);

  }

  actualizarOpcionesClinica( opcionesclinica: OpcionesClinicaModelo ) {

    const opcionesclinicaTemp = {
      ...opcionesclinica
    };

    return this.http.put(`${ this.url }/opcionesclinica/`, opcionesclinicaTemp);


  }

  getOpcionesClinicaPersona( personaId: string ) {
    const url = this.url + '/opcionesclinica/personaId';

    let queryParams = new HttpParams().append("name",personaId);
    return this.http.get<OpcionesClinicaModelo>(url,{params:queryParams})
    .pipe(
      map( this.crearArregloOpciones ),
      delay(0)
    );


    

    

  }



  


  getOpcionesClinica( id: number ) {

    return this.http.get(`${ this.url }/opcionesclinica/${ id }`);

  }


  getOpcionesUrocultivo( id: number ) {

    return this.http.get(`${ this.url }/opcionesclinica/comprobarUrocultivo/${ id }`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );

  }

 


  getOpcionesClinicas(id: number) {
    return this.http.get(`${ this.url }/opcionesclinica/comprobarEstado/${ id }`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }


  getOpcionesClinicasLaboratorio(id: number) {
    return this.http.get(`${ this.url }/opcionesclinica/comprobarEstadoLaboratorio/${ id }`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  

  
  private crearArreglo( opcionesclinicaObj: object ) {

    const opcionesclinicas: OpcionesClinicaModelo[] = [];

    Object.keys( opcionesclinicaObj ).forEach( key => {

      const opcionesclinica: OpcionesClinicaModelo = opcionesclinicaObj[key];
      opcionesclinicas.push( opcionesclinica );
    });

    return opcionesclinicas;

  }

  private crearArregloOpciones( opcionesclinicaObj: object ) {

    const opcionesclinicas: OpcionesClinicaModelo[] = [];

    if (opcionesclinicaObj === null) {
    return null;  
    }

    Object.keys( opcionesclinicaObj ).forEach( key => {

      const opcionesclinica: OpcionesClinicaModelo = opcionesclinicaObj[key];
      opcionesclinicas.push( opcionesclinica );
    });

    return opcionesclinicas;

  }
}
