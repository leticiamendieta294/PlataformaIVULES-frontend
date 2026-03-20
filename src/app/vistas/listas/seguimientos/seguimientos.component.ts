import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SeguimientoModelo } from 'src/app/modelos/seguimiento.modelo';
import { ComunesService } from 'src/app/servicios/comunes.service';
import { SeguimientoService } from 'src/app/servicios/seguimiento.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-seguimientos',
  templateUrl: './seguimientos.component.html',
  styleUrls: ['./seguimientos.component.css']
})
export class SeguimientosComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  private test1;

  cargando = false;  
  seguimientos: SeguimientoModelo[] = [];



  constructor( private tokenService: TokenService,
    private seguimientoService: SeguimientoService,
    private comunes: ComunesService,
    public router: Router,
    private fb: FormBuilder ) { 

}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [[5,10,15,20,50,-1],[5,10,15,20,50,"Todos"]],
      searching: true,
      processing: true,
      language: {
        "lengthMenu": "Mostrar _MENU_ registros",
        "zeroRecords": "No se encontraron resultados",
        "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
        "infoFiltered": "(filtrado de un total de _MAX_ registros)",
        "search":         "Buscar:",
        "paginate": {
          "first":      "Primero",
          "last":       "Ultimo",
          "next":       "Siguiente",
          "previous":   "Anterior"
      },
        
       
      },
      columns: [
        {data:'#'},
      
        
        {data:'codigo'},{data:'cedula'}, {data:'nombres'},
        {data:'apellidos'}, {data:'fechaCreacion'},
        {data:'laboratorio'},{data:'Ver'},
       
      
      ],
     
      

    };
    this.obtenerSeguimiento()

  //  this.dtTrigger.next();
  }
  async obtenerSeguimiento() {
    

    this.test1 = await this.seguimientoService.getSeguimientoNumero(1).toPromise(); 
    this.cargando = false;
    this.seguimientos = [];
    //this.rerender();

    this.seguimientos = this.test1;;
      this.dtTrigger.next();
    //  this.cargando = false;


  


  }

  opciones(event, personaId: number) {
    event.preventDefault();
    this.router.navigate(['inicio/opcionesclinica',personaId]);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
