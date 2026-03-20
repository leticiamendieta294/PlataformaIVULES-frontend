import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CuestionarioBasalModelo } from '../modelos/cuestionariobasal.modelo';
import { map, delay } from 'rxjs/operators';
import { HttpParams } from "@angular/common/http";
import { GlobalConstants } from '../common/global-constants';
@Injectable({
  providedIn: 'root'
})
export class CuestionarioBasalService {

  private url = GlobalConstants.apiUrlBackend;

  constructor( private http: HttpClient ) { }


  crearCuestionarioBasal( cuestionariobasal: CuestionarioBasalModelo ) {

    return this.http.post(`${ this.url }/cuestionariobasal`, cuestionariobasal);

  }

  actualizarCuestionarioBasal( cuestionariobasal: CuestionarioBasalModelo ) {

    const cuestionariobasalTemp = {
      ...cuestionariobasal
    };

    return this.http.put(`${ this.url }/cuestionariobasal/`, cuestionariobasalTemp);


  }

  borrarCuestionarioBasal( id: number ) {

    return this.http.delete(`${ this.url }/cuestionariobasal/${ id }`);

  }


  getCuestionarioBasal( id: number ) {

    return this.http.get(`${ this.url }/cuestionariobasal/${ id }`);

  }

  getCuestionarioBasalByPersonaId( id: number ) {

    return this.http.get(`${ this.url }/cuestionariobasal/pacienteId/${ id }`);

  }

  getComprobarEstado( id: number ) {

    return this.http.get(`${ this.url }/cuestionariobasal/comprobarEstado/${ id }`);

  }


  getExcelCuestionarioBasal() {

    return this.http.get(`${ this.url }/cuestionariobasal/export`,  {
      responseType: 'blob', // Indicamos que esperamos un blob como respuesta
      observe: 'response' // Necesario para acceder a los encabezados de la respuesta
    });

  }

  getCuestionarioBasales() {
    return this.http.get(`${ this.url }/cuestionariobasales`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  buscarCuestionarioBasal() {
    return this.http.get(`${ this.url }/cuestionariobasal/buscar`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
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

  getPersona( id: number ) {

    return this.http.get(`${ this.url }/personas/${ id }`);

  }

  private crearArreglo( cuestionariobasalesObj: object ) {

    const cuestionariobasales: CuestionarioBasalModelo[] = [];

    Object.keys( cuestionariobasalesObj ).forEach( key => {

      const cuestionariobasal: CuestionarioBasalModelo = cuestionariobasalesObj[key];
      cuestionariobasales.push( cuestionariobasal );
    });

    return cuestionariobasales;

  }
}

