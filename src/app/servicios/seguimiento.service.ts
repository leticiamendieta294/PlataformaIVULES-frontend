import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SeguimientoModelo } from '../modelos/seguimiento.modelo';
import { map, delay } from 'rxjs/operators';
import { HttpParams } from "@angular/common/http";
import { GlobalConstants } from '../common/global-constants';
@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {

  private url = GlobalConstants.apiUrlBackend;

  constructor( private http: HttpClient ) { }


  crearSeguimiento( seguimiento: SeguimientoModelo ) {

    return this.http.post(`${ this.url }/seguimiento`, seguimiento);

  }

  actualizarSeguimiento( seguimiento: SeguimientoModelo ) {

    const seguimientoTemp = {
      ...seguimiento
    };

    return this.http.put(`${ this.url }/seguimiento/`, seguimientoTemp);


  }

  borrarSeguimiento( id: number ) {

    return this.http.delete(`${ this.url }/seguimiento/${ id }`);

  }


  getSeguimiento( id: number ) {

    return this.http.get(`${ this.url }/seguimiento/${ id }`);

  }


  getSeguimientos() {
    return this.http.get(`${ this.url }/seguimiento`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  buscarSeguimiento() {
    return this.http.get(`${ this.url }/seguimiento/buscar`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  getSeguimientoByPersonaIdAndNumero( id: number, numero:number ) {

    return this.http.get(`${ this.url }/seguimiento/ver/${ id }/${ numero }`);

  }

  getExcelSeguimiento(numero:number) {

    return this.http.get(`${ this.url }/seguimiento/export/${ numero }`,{
      responseType: 'blob', // Indicamos que esperamos un blob como respuesta
      observe: 'response' // Necesario para acceder a los encabezados de la respuesta
    });

  }

  getSeguimientoNumero(numero:number) {

    return this.http.get(`${ this.url }/seguimiento/numero/${ numero }`,) .pipe(
      map( this.crearArreglo ),
      delay(0)
    );;

  }

  /*buscarPersonasFiltros( patologiaProcedimiento: PersonaModelo, orderBy:string, orderDir:string ) {
    let params = new HttpParams();
    var filtros = patologiaProcedimiento == null ? new PersonaModelo() : patologiaProcedimiento;
    params = params.append('filtros', JSON.stringify(filtros));
    params = params.append('orderBy', orderBy);
    params = params.append('orderDir', orderDir);
    params = params.append('size', '-1');

    return this.http.get(`${ this.url }/personas/buscar/`,{params:params})
    .pipe(
      map( this.crearArreglo ),
      delay(0)
    );
  }

  buscarPersonasFiltrosTabla( persona: PersonaModelo ) {
    let params = new HttpParams();
    var filtros = persona == null ? new PersonaModelo() : persona;

    params = params.append('filtros', JSON.stringify(filtros));
    return this.http.get(`${ this.url }/personas/buscar/`,{params:params})
      .pipe(
        map( this.crearArreglo ),
        delay(0)
      );

  }*/

  private crearArreglo( seguimientosObj: object ) {

    const seguimientos: SeguimientoModelo[] = [];

    Object.keys( seguimientosObj ).forEach( key => {

      const seguimiento: SeguimientoModelo = seguimientosObj[key];
      seguimientos.push( seguimiento );
    });

    return seguimientos;

  }
}

