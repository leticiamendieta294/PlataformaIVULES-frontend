import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CuestionarioBasalModelo } from '../modelos/cuestionariobasal.modelo';
import { map, delay } from 'rxjs/operators';
import { HttpParams } from "@angular/common/http";
import { GlobalConstants } from '../common/global-constants';
@Injectable({
  providedIn: 'root'
})
export class InformesService {

  private url = GlobalConstants.apiUrlBackend;

  constructor( private http: HttpClient ) { }


 
  getInformes(  ) {

    return this.http.get(`${ this.url }/informes`);

  }

  
}