import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComunesService } from 'src/app/servicios/comunes.service';
import { CuestionarioBasalService } from 'src/app/servicios/cuestionariobasal.service';
import { LaboratorioService } from 'src/app/servicios/laboratorio.service';
import { SeguimientoService } from 'src/app/servicios/seguimiento.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  constructor( private tokenService: TokenService,
             
   
  
    private comunes: ComunesService,
    private laboratorioService: LaboratorioService,
    private cuestionarioBasalService: CuestionarioBasalService,

    private seguimientoService: SeguimientoService,
  
private router: Router,
private route: ActivatedRoute) { }

  ngOnInit(): void {
  }


  cuestionariobasal(event) {
    event.preventDefault();
    this.cuestionarioBasalService.getExcelCuestionarioBasal().subscribe((response: HttpResponse<Blob>) => {
      const filename = 'CuestionarioBasal' + new Date().toISOString() + '.xlsx';
      const contentType = response.headers.get('Content-Type');

      // Creamos un objeto Blob con la respuesta y lo guardamos en una URL
      const blob = new Blob([response.body], { type: contentType });
      const url = window.URL.createObjectURL(blob);

      // Creamos un enlace <a> y lo configuramos para que inicie la descarga del archivo
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      // Liberamos la URL creada
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  


  }
  


  laboratorio(event,nro) {
    event.preventDefault();
    this.laboratorioService.getExcelLaboratorio(nro).subscribe((response: HttpResponse<Blob>) => {
      const filename = 'Laboratorio_'+nro + new Date().toISOString() + '.xlsx';
      const contentType = response.headers.get('Content-Type');

      // Creamos un objeto Blob con la respuesta y lo guardamos en una URL
      const blob = new Blob([response.body], { type: contentType });
      const url = window.URL.createObjectURL(blob);

      // Creamos un enlace <a> y lo configuramos para que inicie la descarga del archivo
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      // Liberamos la URL creada
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  

   
  }

  seguimiento(event,nro) {
    event.preventDefault();
    this.seguimientoService.getExcelSeguimiento(nro).subscribe((response: HttpResponse<Blob>) => {
      const filename = 'Seguimiento_'+nro+" "+ new Date().toISOString() + '.xlsx';
      const contentType = response.headers.get('Content-Type');

      // Creamos un objeto Blob con la respuesta y lo guardamos en una URL
      const blob = new Blob([response.body], { type: contentType });
      const url = window.URL.createObjectURL(blob);

      // Creamos un enlace <a> y lo configuramos para que inicie la descarga del archivo
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      // Liberamos la URL creada
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  

   
  }

}
