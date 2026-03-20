import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LaboratorioModelo } from '../modelos/laboratorio.modelo';
import { map, delay } from 'rxjs/operators';
import { HttpParams } from "@angular/common/http";
import { GlobalConstants } from '../common/global-constants';
@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {

  private url = GlobalConstants.apiUrlBackend;

  constructor( private http: HttpClient ) { }


  crearLaboratorio( laboratorio: LaboratorioModelo ) {

    return this.http.post(`${ this.url }/laboratorio`, laboratorio);

  }

  actualizarLaboratorio( laboratorio: LaboratorioModelo ) {

    const laboratorioTemp = {
      ...laboratorio
    };

    return this.http.put(`${ this.url }/laboratorios/`, laboratorioTemp);


  }

  borrarLaboratorio( id: number ) {

    return this.http.delete(`${ this.url }/laboratorio/${ id }`);

  }


  getLaboratorio( id: number ) {

    return this.http.get(`${ this.url }/laboratorio/${ id }`);

  }


  getLaboratorios() {
    return this.http.get(`${ this.url }/laboratorio`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  buscarLaboratorio() {
    return this.http.get(`${ this.url }/laboratorio/buscar`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  getLaboratorioByPersonaIdAndNumero( id: number, numero:number ) {

    return this.http.get(`${ this.url }/laboratorio/ver/${ id }/${ numero }`);

  }

  getExcelLaboratorio(numero:number) {

    return this.http.get(`${ this.url }/laboratorio/export/${ numero }`,{
      responseType: 'blob', // Indicamos que esperamos un blob como respuesta
      observe: 'response' // Necesario para acceder a los encabezados de la respuesta
    });

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

  private crearArreglo( laboratoriosObj: object ) {

    const laboratorios: LaboratorioModelo[] = [];

    Object.keys( laboratoriosObj ).forEach( key => {

      const laboratorio: LaboratorioModelo = laboratoriosObj[key];
      laboratorios.push( laboratorio );
    });

    return laboratorios;

  }
}

