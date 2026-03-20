import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlName, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

import { SeguimientoModelo } from '../../../modelos/seguimiento.modelo';
import { TipoIsModelo } from '../../../modelos/tipoIs.modelo';
import { ParametroModelo } from '../../../modelos/parametro.modelo';
import { ComunesService } from 'src/app/servicios/comunes.service';


import { CuestionarioBasalService } from '../../../servicios/cuestionariobasal.service';
import { ParametrosService } from '../../../servicios/parametros.service';


import Swal from 'sweetalert2';
import { TokenService } from 'src/app/servicios/token.service';
import { CuestionarioBasalModelo } from 'src/app/modelos/cuestionariobasal.modelo';
import { PersonaModelo } from 'src/app/modelos/persona.modelo';
import { PersonasService } from 'src/app/servicios/personas.service';
import { delay } from 'rxjs/operators';
import { Persona2Modelo } from 'src/app/modelos/persona2.modelo';
import { OpcionesClinicaModelo } from 'src/app/modelos/opcionesclinica.modelo';
import { OpcionesClinicaService } from 'src/app/servicios/opcionesclinica.service';

@Component({
  selector: 'app-cuestionariobasal',
  templateUrl: './cuestionariobasal.component.html',
  styleUrls: ['./cuestionariobasal.component.css']
})
export class CuestionariobasalComponent implements OnInit   {

  crear = false;
  element = true;
  elementUP = true;
  elementM = false;
  elementFR = false;
  elementTI = false;
  elementG = false;
  elementIS = false;
  elementTS = false;
  elementR = false;
  elementEC = false;
  elementIU = false;
  elementSV = false;
  elementPGP = false;
  elementANTB = false;
  elementOI = false;
 
  elementATU = false;
  elementL = false;
  elementIVU =  false;
  elementIV =  false;

  elementSU =  false;
  elementSIAntecedentes = false;
  elementHISTERECTOMIA =  false;

  checkListValue = true;
  tipoISCheck='';
  cuestionariobasalForm: FormGroup;
  listaRespuesta: ParametroModelo;
  listaRespuestaSexado: ParametroModelo;
  listaRespuestaMenopausia: ParametroModelo;
  listaTipoIndividuo: ParametroModelo;
  listaEstadoRenal : ParametroModelo;
  listatipoestrenimientoParam : ParametroModelo;

  listaTipoIncontinenciaUrinariaParam : ParametroModelo;
 

  LStipoActividadSexual : ParametroModelo;
  alertGuardar:boolean=false;
  progress = 0;
  message = '';  
  public verPersona : PersonaModelo = new PersonaModelo();
  pacientePersona: PersonaModelo = new PersonaModelo();  
  nombrePersona = '';
  private test1;

  public opcionesClinica :  OpcionesClinicaModelo = new OpcionesClinicaModelo();
  public cuestionarioBasalS:any;

 tipoISTexto='';
  
  checkboxesDataList = [ {
    id: 'C001',
    label: 'Metotrexato',
    isChecked : false
  
  },
  {
    id: 'C002',
    label: 'Micofenolato de mofetilo',
    isChecked : false
  },
  {
    id: 'C003',
    label: 'Azatioprina',
    isChecked : false
  },
  {
    id: 'C004',
    label: 'Ciclofosfamida',
    isChecked : false
  },
  {
    id: 'C005',
    label: 'Voclosporina',
    isChecked : false
  },
  {
    id: 'C006',
    label: 'Leflunomida',
    isChecked : false
  },
  {
    id: 'C007',
    label: 'Tacrolimus',
    isChecked : false
  },
  {
    id: 'C008',
    label: 'Ciclosporina',
    isChecked : false
  },
  {
    id: 'C009',
    label: 'Rituximab',
    isChecked : false
  },
  {
    id: 'C010',
    label: 'Belimumab',
    isChecked : false
  },
  {
    id: 'C011',
    label: 'Hidroxicloroquina',
    isChecked : false
  },
  



];


  /*Nuevos agregados*/
  elementASNroVecesSemana = false;
 
  constructor(private tokenService: TokenService,
    private cuestionariobasalService: CuestionarioBasalService,
    private parametrosService: ParametrosService,
    private personasService: PersonasService,
    private opcionesClinicaService: OpcionesClinicaService,
    private comunes: ComunesService,
    private router: Router,
    private route: ActivatedRoute, 
    private changeDetector: ChangeDetectorRef,
    private fb: FormBuilder) { 
      

      this.crearFormulario();

      
    }

  async  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    this.obtenerParametros();

    this.obtenerPersona(id);

   
   

    this.cuestionariobasalService.getCuestionarioBasalByPersonaId(Number(id))
    .subscribe( resp => {      
      this.cuestionarioBasalS = resp;
      if (this.cuestionarioBasalS ===null) {
        this.crear == true;

       
       
      }else{
        this.cuestionariobasalService.getCuestionarioBasal( this.cuestionarioBasalS.cuestionarioId )
        .subscribe( (resp: CuestionarioBasalModelo) => {
          this.checkboxesDataList  = [];
      
         let arr =  JSON.parse(resp.tipoIs); 
        
         resp.tipoIs = null;
          this.cuestionariobasalForm.patchValue(resp);

         

         

          
      

             
          if(resp.infeccionVaginal =='SI' || resp.infeccionVaginal =='S'){
            this.elementIV = true
          }

       
     

          if(resp.tratamientoGlucocorticoides  =='SI' || resp.tratamientoGlucocorticoides =='S'){
            this.elementG = true
          }


          if(resp.menopausia  =='SI' || resp.menopausia =='S'){
            this.elementM = true
          }

          if(resp.tratamientoInmunosupresoresIs || resp.tratamientoInmunosupresoresIs =='S'){
            this.elementIS = true
          }

          if(resp.tipoIndividuo  =='SI' || resp.tipoIndividuo =='S'){
            this.elementTI = true
          }

          

          if(resp.presentaManifestacionRenal  =='SI' || resp.presentaManifestacionRenal =='S'){
            this.elementR = true
          }

          if(resp.factoresRiesgoEstreñimientoCronico  =='SI' || resp.factoresRiesgoEstreñimientoCronico =='S'){
            this.elementEC = true
          }

         
          if(resp.factoresRiesgoIncontinenciaUrinaria  =='SI' || resp.factoresRiesgoIncontinenciaUrinaria =='S'){
            this.elementIU = true
          }
       
          
          if(resp.factoresRiesgoSondajeVesicalPrevio  =='SI' || resp.factoresRiesgoSondajeVesicalPrevio =='S'){
            this.elementSV = true
          }
         
         
          if(resp.factoresRiesgoAnomaliasAnatomicasTractoUrinario  =='SI' || resp.factoresRiesgoAnomaliasAnatomicasTractoUrinario =='S' ){
            this.elementATU = true
          }

          if(resp.factoresRiesgoLeucopenia  =='SI' || resp.factoresRiesgoLeucopenia =='S' ){
            this.elementL = true
          }

          if(resp.ivusUltimo12meses  =='SI' || resp.ivusUltimo12meses =='S' ){
            this.elementIVU = true
          }

          if(resp.factoresRiesgoSexualmenteActivo  =='SI' || resp.factoresRiesgoSexualmenteActivo =='S' ){
            this.elementASNroVecesSemana = true
          }

          if(resp.tipoIndividuo  =='Expuestos factor riesgo (LES)' || resp.tipoIndividuo == 'EFR (LES)'){
            this.elementTI = true
          }

          if(resp.factoresRiesgoAntibioticoterapiaUltimos6m  =='SI' || resp.factoresRiesgoAntibioticoterapiaUltimos6m =='S'){
            this.elementANTB = true
          }
  
          if(resp.factoresRiesgoOtrasCausasInmunodepresion  =='SI' || resp.factoresRiesgoOtrasCausasInmunodepresion =='S'){
            this.elementOI= true
          }


          if(resp.factoresRiesgoProcedimientoUrinarioGinecPrevio =='SI' || resp.factoresRiesgoProcedimientoUrinarioGinecPrevio =='S'){
            this.elementPGP= true
          }

          if(resp.menopausia =='DIFICIL DE DETERMINAR POR HISTERECTOMIA' ){
            this.elementHISTERECTOMIA= true
          }

          if(resp.sintomasUrinarios =='SI' ||resp.sintomasUrinarios =='S' ){
            this.elementSU= true
          }

          if(resp.factoresRiesgoAntecedentesIvuUltimoAnho =='SI' ||resp.factoresRiesgoAntecedentesIvuUltimoAnho =='S' ){
             this.elementSIAntecedentes= true
          }
    
  
  
  this.checkboxesDataList  = arr;

        });
  
      }
      })
    

   /* if ( id !== 'nuevo' ) {
      
      this.cuestionariobasalService.getCuestionarioBasal( Number(id) )
        .subscribe( (resp: CuestionarioBasalModelo) => {
          this.cuestionariobasalForm.patchValue(resp);
        });
    }else{*/
     
     
   // }


  }

 


  async obtenerPersona(id: string) {
    var numberValue = Number(id);

    this.test1 = await this.personasService.getPersona(Number(id)).toPromise(); 
 
    this.verPersona = this.test1;


    return this.verPersona;


  }

  obtenerParametros() {
    

    var respuestaParam = new ParametroModelo();
    respuestaParam.codigoParametro = "RESPUESTA";
    respuestaParam.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    this.parametrosService.buscarParametrosFiltrosOrder( respuestaParam, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.listaRespuesta = resp;
    });


    var tipoindividuoParam = new ParametroModelo();
    tipoindividuoParam.codigoParametro = "TIPO_INDIVIDUO";
    tipoindividuoParam.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    this.parametrosService.buscarParametrosFiltrosOrder( tipoindividuoParam, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.listaTipoIndividuo = resp;
    });


     
    var estadoRenalParam = new ParametroModelo();
    estadoRenalParam.codigoParametro = "ESTADO_RENAL";
    estadoRenalParam.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    this.parametrosService.buscarParametrosFiltrosOrder( estadoRenalParam, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.listaEstadoRenal = resp;
    });


    var tipoestrenimientoParam = new ParametroModelo();
    tipoestrenimientoParam.codigoParametro = "TIPO_ESTREÑIMIENTO";
    tipoestrenimientoParam.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    this.parametrosService.buscarParametrosFiltrosOrder( tipoestrenimientoParam, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.listatipoestrenimientoParam = resp;
    });


    var tipoIncontinenciaUrinaria = new ParametroModelo();
    tipoIncontinenciaUrinaria.codigoParametro = "TIPO_INCONTINENCIAURINARIA";
    tipoIncontinenciaUrinaria.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    this.parametrosService.buscarParametrosFiltrosOrder( tipoIncontinenciaUrinaria, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.listaTipoIncontinenciaUrinariaParam = resp;
    });


   


    var respuestaSexado = new ParametroModelo();
    respuestaSexado.codigoParametro = "LISTA_SEXADO";
    respuestaSexado.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    this.parametrosService.buscarParametrosFiltrosOrder( respuestaSexado, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.listaRespuestaSexado = resp;
      
    });

    var respuestaMenopausia = new ParametroModelo();
    respuestaMenopausia.codigoParametro = "LISTA_MENOPAUSIA";
    respuestaMenopausia.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    this.parametrosService.buscarParametrosFiltrosOrder( respuestaMenopausia, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.listaRespuestaMenopausia = resp;
      
    });


    var listaTipoAS = new ParametroModelo();
    listaTipoAS.codigoParametro = "LStipoActividadSexual";
    listaTipoAS.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    this.parametrosService.buscarParametrosFiltrosOrder( listaTipoAS, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.LStipoActividadSexual = resp;
      
    });

    
    
  }

  guardar( ) {
    this.cerrarAlertGuardar();
    if ( this.cuestionariobasalForm.invalid ) {
      this.alertGuardar = true;
      return Object.values( this.cuestionariobasalForm.controls ).forEach( control => {

        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();


    let peticion: Observable<any>;
    var cuestionariobasal: CuestionarioBasalModelo = new CuestionarioBasalModelo();
    
    cuestionariobasal = this.cuestionariobasalForm.getRawValue();
   

    
     cuestionariobasal.personas = this.verPersona;

     this.obtenerRespuestaCheckSelection();
     this.getSelectionSintomas();
     
     cuestionariobasal.tipoIs = this.tipoISCheck;
     cuestionariobasal.tipoISTexto = this.tipoISTexto;
      cuestionariobasal.usuarioCreacion = this.tokenService.getUserName().toString();
     
      peticion = this.cuestionariobasalService.crearCuestionarioBasal( cuestionariobasal );
    

    peticion.subscribe( resp => {

      var mensajeUpload = '';
      

      Swal.fire({
                icon: 'success',
                title: 'Cuestionario Guardado',
                text: resp.mensaje,
              }).then( resp => {

        if ( resp.value ) {
          if ( !this.crear ) {
            this.router.navigate(['inicio/opcionesclinica',this.verPersona.personaId]);
          }else{
            this.limpiar(event);
          }
        }
      });
    }, e => {Swal.fire({
              icon: 'error',
              title: 'Algo salió mal',
              text: this.comunes.obtenerError(e)
            })
       }
    );



  }

  limpiar(event){
    event.preventDefault();
    this.cuestionariobasalForm.reset();
  }

  obtenerError(e : any){
    var mensaje = "Error indefinido ";
      if(e.error){
        if(e.error.mensaje){
          mensaje = e.error.mensaje;
        }
        if(e.error.message){
          mensaje = e.error.message;
        }
        if(e.error.errors){
          mensaje = mensaje + ' ' + e.error.errors[0];
        }
        if(e.error.error){
          mensaje = mensaje + ' ' + e.error.error;
        }
      }
      if(e.message){
        mensaje = mensaje + ' ' + e.message;
      }
    return mensaje;  
  }


  get firmaEncargadoNoValido() {
    return this.cuestionariobasalForm.get('firmaEncargado').invalid && this.cuestionariobasalForm.get('firmaEncargado').touched
  }

  crearFormulario() {

    this.cuestionariobasalForm = this.fb.group({
      cuestionarioId  : [null, [] ],
      participaEstudio  : [null, []  ],
      urocultivoPositivo  : [null, []  ],
      menopausia  : [null, []  ],
      edadMenopausia: [null, [] ],
      anhosHisterectomia: [null, [] ],
      factoresRiesgoSexualmenteActivo: [null, [] ],
      factoresRiesgoEstreñimientoCronico: [null, [] ],
      factoresRiesgoIncontinenciaUrinaria: [null, [] ],
      factoresRiesgoLitiasisRenal: [null, [] ],
      factoresRiesgoCorticoides: [null, [] ],
      factoresRiesgoSondajeVesicalPrevio: [null, [] ],
      factoresRiesgoProcedimientoUrinarioGinecPrevio: [null, [] ],
      factoresRiesgoAntecedentesIvuUltimoAnho: [null, [] ],
      factoresRiesgoAntibioticoterapiaUltimos6m: [null, [] ],
      nroIvusUltimo12meses: [null, [] ],
      tipoIndividuo: [null, [] ],
      tiempoEvolucionLes  : [null, [] ],
      tratamientoGlucocorticoides: [null, [] ],
      dosisDiariaCantidadMg: [null, [] ],
      dosisAcumuladaUltimo6meses: [null, [] ],
      tratamientoInmunosupresoresIs: [null, [] ],

/*Nuevos */
factoresRiesgoSindromeSjogren: [null, [] ],
factoresRiesgoTipoEstreñimientoCronico: [null, [] ],
factoresRiesgoFrecuenciaUrinariaBaja: [null, [] ],
factoresRiesgoActividadSexualNroVeces: [null, [] ],
factoresRiesgoTipoIncontinenciaUrinaria: [null, [] ],
factoresRiesgoEnfermedadRenalCronica: [null, [] ],
factoresRiesgoHiperplasiaProstaticaBenigna: [null, [] ],
factoresRiesgoDiabetes: [null, [] ],
factoresRiesgoAnomaliasAnatomicasTractoUrinario: [null, [] ],
factoresRiesgoLeucopenia: [null, [] ],
factoresRiesgoTipoLeucopenia: [null, [] ],
ivusUltimo12meses: [null, [] ],
firmaEncargado: [null, [ Validators.required] ],
tipoActividadSexual :  [null, [] ],
infeccionVaginal :  [null, [] ],
nroInfeccionVaginalAnual :  [null, [] ],


factoresRiesgoBajaIngestaliquidos:  [null, [] ],

procedimientoUrinarioGinecPrevioEspecificar: [null, [] ],

recibioProfilaxisAcordeGuias: [null, [] ],

antibioticoterapiaUltimos6mEspecificar: [null, [] ],


factoresRiesgoCancer: [null, [] ],

factoresRiesgoOtrasCausasInmunodepresion: [null, [] ],

otrasCausasInmunodepresionEspecificar : [null, [] ],

antiDNAPositivo: [null, [] ],
complementosBajos: [null, [] ],




/*nuevos sintomas */

sintomaDisuria: [null, [] ],

sintomaPolaquiuria: [null, [] ],

sintomaTenesmo: [null, [] ],

sintomaDolorSuprapubico: [null, [] ], 

sintomaUrgenciaMiccional: [null, [] ],

sintomaFiebre: [null, [] ],

sintomasUrinarios: [null, [] ],

otroSintomasIVU: [null, [] ],

anticuerposSAFpositivos: [null, [] ],
factoresRiesgoAnomaliasAnatomicasTractoEspecificar: [null, [] ],
     // tipoIs: [null, [] ],
      otroTipoIs: [null, [] ],
      dosis: [null, [] ],
      presentaManifestacionRenal: [null, [] ],
      estadoEncuentra: [null, [] ],
      sledaiPuntos0A30: [null, [] ],
      factoresRiesgoEmbarazo: [null, [] ],
      otrosFactoresRiesgo: [null, [] ],
      germenSiAntecedentes: [null, [] ],

      personas: [null, [] ], 
    
      fechaIngreso: [null, [] ],

      
     
     
      fechaCreacion: [null, [] ],
      fechaModificacion: [null, [] ],
      usuarioCreacion: [null, [] ],
      usuarioModificacion: [null, [] ],   
     
    });

  //  this.cuestionariobasalForm.get('idCuestionario').disable();

    this.cuestionariobasalForm.get('fechaCreacion').disable();
    this.cuestionariobasalForm.get('fechaModificacion').disable();
    this.cuestionariobasalForm.get('usuarioCreacion').disable();
    this.cuestionariobasalForm.get('personas').disable();
    this.cuestionariobasalForm.get('usuarioModificacion').disable();   
   
  }
  cerrarAlertGuardar(){
    this.alertGuardar=false;
  }


  getSelectedValue(value:any){

    if(value.toString() =='SI' || value.toString() =='S'){
      return (this.element = true);
    }else{

      return (this.element = false);
    }
  
    
  }

  getSelectedValueUP(value:any){
  
    if(value.toString() =='SI' || value.toString() =='S'){
      return (this.elementUP = true);
    }else{

      return (this.elementUP = false);
    }
   
  } 

  getSelectedValueASR(value:any){
  
    if(value.toString() =='SI'|| value.toString() =='S'){
      return (this.elementASNroVecesSemana = true);
    }else{

      return (this.elementASNroVecesSemana = false);
    }
   
  } 
  
  getSelectedValueM(value:any){
  
    if(value.toString() =='SI' || value.toString() =='S'){
      return (this.elementM = true, this.elementFR=true,this.elementHISTERECTOMIA = false);
    }else if(value.toString() =='DIFICIL DE DETERMINAR POR HISTERECTOMIA'){
      return (this.elementHISTERECTOMIA = true, this.elementM=false);
    }else{
      return (this.elementM = false, this.elementFR=false,this.elementHISTERECTOMIA=false);
    }
  } 


  getSelectedValueTI(valor:any){

  
    if(valor.toString() =='Expuestos factor riesgo (LES)' || valor.toString() =='EFR (LES)'){
      return (this.elementTI = true);
    }else{
      return (this.elementTI = false);
    }
  }
  
  

  getSelectedValueTS(valor:any){

  
    if(valor.toString() =='SI' || valor.toString() =='S'){
      return (this.elementASNroVecesSemana = true);
    }else{
      return (this.elementASNroVecesSemana = false);
    }
  }

  getSelectedValueIU(valor:any){

  
    if(valor.toString() =='SI'|| valor.toString() =='S'){
      return (this.elementIU = true);
    }else{
      return (this.elementIU = false);
    }
  }

  getSelectedValueEC(valor:any){

  
    if(valor.toString() =='SI' || valor.toString() =='S'){
      return (this.elementEC = true);
    }else{
      return (this.elementEC = false);
    }
  }

  getSelectedValueSV(valor:any){

  
    if(valor.toString() =='SI' || valor.toString() =='S'){
      return (this.elementSV = true);
    }else{
      return (this.elementSV = false);
    }
  }

 
  getSelectedValueG(valor:any){

  
    if(valor.toString() =='SI' || valor.toString() =='S'){
      return (this.elementG = true);
    }else{
      return (this.elementG = false);
    }
  }


  getSelectedValueIS(valor:any){

  
    if(valor.toString() =='SI' || valor.toString() =='S'){
      return (this.elementIS = true);
    }else{
      return (this.elementIS = false);
    }
  }

  
  getSelectedValueIV(valor:any){

  
    if(valor.toString() =='SI' || valor.toString() =='S'){
      return (this.elementIV = true);
    }else{
      return (this.elementIV = false);
    }
  }

  getSelectedValueATU(valor:any){

  
    if(valor.toString() =='SI'|| valor.toString() =='S'){
      return (this.elementATU = true);
    }else{
      return (this.elementATU = false);
    }
  }

  getSelectedValueL(valor:any){

  
    if(valor.toString() =='SI' || valor.toString() =='S'){
      return (this.elementL = true);
    }else{
      return (this.elementL = false);
    }
  }
  getSelectedValueIVU(valor:any){

  
    if(valor.toString() =='SI' || valor.toString() =='S'){
      return (this.elementIVU = true);
    }else{
      return (this.elementIVU = false);
    }
  }

  getSelectedValueR(valor:any){

  
    if(valor.toString() =='SI' || valor.toString() =='S'){
      return (this.elementR = true);
    }else{
      return (this.elementR = false);
    }
  }


  
  getSelectedValuePGP(valor:any){

  
    if(valor.toString() =='SI' || valor.toString() =='S'){
      return (this.elementPGP = true);
    }else{
      return (this.elementPGP = false);
    }
  }

  getSelectedValueANTB(valor:any){

  
    if(valor.toString() =='SI' || valor.toString() =='S'){
      return (this.elementANTB = true);
    }else{
      return (this.elementANTB = false);
    }
  }

  getSelectedValueOI(valor:any){

  
    if(valor.toString() =='SI' || valor.toString() =='S'){
      return (this.elementOI = true);
    }else{
      return (this.elementOI = false);
    }
  }


  getSelectedSU(valor:any){

  
    if(valor.toString() =='SI' || valor.toString() =='S'){
      return (this.elementSU = true);
    }else{
      return (this.elementSU = false);
    }
  }

    getSelectedAntecedentes(valor:any){
  
    if(valor.toString() =='SI' || valor.toString() =='S'){
      return (this.elementSIAntecedentes = true);
    }else{
      return (this.elementSIAntecedentes = false);
    }
  }


  
  changeSelection(value:any, checked: boolean) {
   
 
    if (checked) { 
   
      for (var i=0; i<this.checkboxesDataList.length; i++){
        if (this.checkboxesDataList[i].label===value){
          this.checkboxesDataList[i].isChecked = true; 
        }
      }
    //  this.checkedIDs.push(value);
    } else { //Si el elemento fue deseleccionado
     
      for (var i=0; i<this.checkboxesDataList.length; i++){
        if (this.checkboxesDataList[i].label===value){
          this.checkboxesDataList[i].isChecked = false; 
        }
      }
    }

       
  }

  getSelectionSintomas() {
      for (var i=0; i<this.checkboxesDataList.length; i++){
        if (this.checkboxesDataList[i].isChecked===true){
          this.tipoISTexto = this.tipoISTexto + this.checkboxesDataList[i].label + ";";
        }
      }
   
     

       
  }

  opciones(event) {
    event.preventDefault();
    this.router.navigate(['inicio/opcionesclinica',this.verPersona.personaId]);
  }

  obtenerRespuestaCheckSelection(){

   this.tipoISCheck= JSON.stringify(this.checkboxesDataList);


  }

  
  }


  





