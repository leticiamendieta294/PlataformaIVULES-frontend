import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { SeguimientoModelo } from '../../../modelos/seguimiento.modelo';
import { ParametroModelo } from '../../../modelos/parametro.modelo';
import { ComunesService } from 'src/app/servicios/comunes.service';
import { PersonasService } from 'src/app/servicios/personas.service';


import { SeguimientoService } from '../../../servicios/seguimiento.service';
import { ParametrosService } from '../../../servicios/parametros.service';


import Swal from 'sweetalert2';
import { TokenService } from 'src/app/servicios/token.service';
import { OpcionesClinicaModelo } from 'src/app/modelos/opcionesclinica.modelo';
import { PersonaModelo } from 'src/app/modelos/persona.modelo';


@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {

  crear = false;
  seguimientoForm: FormGroup;
  listaRespuesta: ParametroModelo;
  listaTipoIndividuo: ParametroModelo;
  listaEstadoRenal : ParametroModelo;
  listaTipoBacteria : ParametroModelo;
  listaIVU: ParametroModelo;
  listaClasificacionIVU : ParametroModelo;
  listaSeveridadIVU : ParametroModelo;
  listaRespuestaSexado : ParametroModelo;
  listaRespuestaMenopausia: ParametroModelo;
  LStipoActividadSexual : ParametroModelo;
  alertGuardar:boolean=false;
  public verPersona : PersonaModelo = new PersonaModelo();
  public opcionesClinica :  OpcionesClinicaModelo = new OpcionesClinicaModelo()

  progress = 0;
  message = '';  

  numeroSeguimiento='';

  etapaSeguimiento='';

  
  
  element = false;
  elementUP = false;
  elementTI = false;
  elementG = false;
  elementIS = false;
  elementPS = false;
  elementR = false;
  elementTS = false;
  lementTI = false;
  elementEC = false;
  elementIU = false;
  elementSV = false;
  elementATU = false;
  elementL = false;
  elementIVU =  false;
  elementIV =  false;
  elementM = false;
  elementBA= false;
  elementTBA= false;
  elementHISTERECTOMIA =  false;

  elementFR =  false;


  elementASNroVecesSemana = false;

  elementPGP = false;
  elementANTB = false;
  elementOI = false;

  elementTANTB = false;

  elementSU =  false;

  elementSIAntecedentes =  false;
 



  public seguimientoS:any;
  

  pacientePersona: PersonaModelo = new PersonaModelo();  
  nombrePersona = '';
  germenAisladoTexto='';
  tipoISTexto='';
  private test1;

  selectedItemsList = [];
  checkedIDs = [];
  checkboxesDataList = [
    {
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
    
    
  ]
  
sintomasIDs = [];
  sintomasDataList = [
    
   
    
  ]

  
  checkedbIDs = [];
  bacteriasDataList = [
    {
      id: 'B001',
      desc: 'Escherichia Coli',
      isChecked: false
    },
    {
      id: 'B002',
      desc: 'Klebsiella Neumoniae',
      isChecked: false
    },
    {
      id: 'B003',
      desc: 'Proteus mirabilis',
      isChecked: false
    },
    {
      id: 'B004',
      desc: 'Pseudonomas spp.',
      isChecked: false
    },
    {
      id: 'B005',
      desc: 'Staphylococus saprophyticus',
      isChecked: false
    },
    {
      id: 'B006',
      desc: 'Streptococcus agalactiae',
      isChecked: false
    },
    {
      id: 'B007',
      desc: 'Enterococus faecalis',
      isChecked: false
    },
    {
      id: 'B008',
      desc: 'Serratia marcenses',
      isChecked: false
    },{
      id: 'B009',
      desc: 'Morganella morganii',
      isChecked: false
    },{
      id: 'B010',
      desc: 'Acinetobacter baumanii',
      isChecked: false
    },
    
  ]
  tipoSintomasCheck: string;
  tipoISCheck: string;
  tipoBacteriasCheck: string;
  elementLES = false;
  listatipoestrenimientoParam : ParametroModelo;

  listaTipoIncontinenciaUrinariaParam : ParametroModelo;
  listaTipoAbortoParam : ParametroModelo;

  listaHizoDiagnostico : ParametroModelo;



  constructor(private tokenService: TokenService,
    private seguimientoService: SeguimientoService,
    private parametrosService: ParametrosService,
    private personasService: PersonasService,
    private comunes: ComunesService,
    private router: Router,
    private route: ActivatedRoute, 
    private fb: FormBuilder) { 
      this.crearFormulario();
    }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    const nro = this.route.snapshot.paramMap.get('numero');
    this.obtenerParametros();
 
    this.obtenerPersona(id);

   this.obtenerMesSeguimiento(nro);
    
      

      this.numeroSeguimiento = nro;

      console.log(nro);

      this.seguimientoService.getSeguimientoByPersonaIdAndNumero(Number(id), Number(nro))
      .subscribe( resp => {      
        this.seguimientoS = resp;
        
        if (this.seguimientoS ===null) {
          this.crear == true;
        }else{
         this.seguimientoService.getSeguimiento( this.seguimientoS.idSeguimiento )
          .subscribe( (resp: SeguimientoModelo) => {
            this.checkboxesDataList  = [];
            this.sintomasDataList = [];
            this.bacteriasDataList= [];
      
         let arr =  JSON.parse(resp.tipoIs); 
        let sintomas = JSON.parse(resp.sintomasIVU);
        let bacterias = JSON.parse(resp.germenAislado);
         resp.tipoIs = null;
         resp.sintomasIVU=null;
         resp.germenAislado=null;  

            this.seguimientoForm.patchValue(resp);

            if(resp.menopausia  =='SI' || resp.menopausia =='S'){
              this.elementM = true
            }

            if(resp.historiaIVUUltimaVisitaProyecto =='SI' || resp.historiaIVUUltimaVisitaProyecto =='S'){
              this.element = true
            }
  
            if(resp.tipoIndividuo  =='Expuestos factor riesgo (LES)' || resp.tipoIndividuo == 'EFR (LES)'){
              this.elementTI = true
            }
          
            if(resp.factoresRiesgoSexualmenteActivo  =='SI' || resp.factoresRiesgoSexualmenteActivo =='S' ){
              this.elementASNroVecesSemana = true
            }
       
  
            if(resp.tratamientoGlucocorticoides  =='SI' || resp.tratamientoGlucocorticoides =='S'){
              this.elementG = true
            }
  
            if(resp.infeccionVaginal  =='SI' || resp.infeccionVaginal =='S'){
              this.elementIV = true
            }
  
          
  
            if(resp.tratamientoInmunosupresoresIs  =='SI' || resp.tratamientoInmunosupresoresIs =='S'){
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
          
           
            if(resp.factoresRiesgoAnomaliasAnatomicasTractoUrinario  =='SI' || resp.factoresRiesgoAnomaliasAnatomicasTractoUrinario =='S'){
              this.elementATU = true
            }
  
            if(resp.factoresRiesgoLeucopenia  =='SI' || resp.factoresRiesgoLeucopenia =='S' ){
              this.elementL = true
            }
  
            if(resp.ivusUltimaVisita  =='SI' || resp.ivusUltimaVisita =='S'){
              this.elementIVU = true
            }

            if(resp.presentoSintomas  =='SI' || resp.presentoSintomas =='S'){
              this.elementPS = true
            }

            if(resp.factoresRiesgoAntibioticoterapiaUltimaVisita  =='SI' || resp.factoresRiesgoAntibioticoterapiaUltimaVisita =='S'){
              this.elementANTB = true
            }
    
            if(resp.factoresRiesgoOtrasCausasInmunodepresion  =='SI' || resp.factoresRiesgoOtrasCausasInmunodepresion =='S'){
              this.elementOI= true
            }


            if(resp.urocultivoPositivo  =='SI' || resp.urocultivoPositivo =='S'){
              this.elementUP= true
            }

            if(resp.tratoconAntibioticos  =='SI' || resp.tratoconAntibioticos =='S'){
              this.elementTANTB= true
            }


            if(resp.bacteriuriaAsintomaticaUltimaVisita  =='SI' || resp.bacteriuriaAsintomaticaUltimaVisita =='S'){
              this.elementBA= true
            }

            if(resp.tratamientoBacteriuriaAsintomatica  =='SI' || resp.tratamientoBacteriuriaAsintomatica =='S'){
              this.elementTBA= true
            }
            if(resp.factoresRiesgoProcedimientoUrinarioGinecPrevio  =='SI' || resp.factoresRiesgoProcedimientoUrinarioGinecPrevio =='S'){
              this.elementPGP= true
            }

            if(resp.menopausia =='DIFICIL DE DETERMINAR POR HISTERECTOMIA' ){
              this.elementHISTERECTOMIA= true
            }

            if(resp.sintomasUrinarios =='SI' ||resp.sintomasUrinarios =='S' ){
              this.elementSU= true
            }

            if(resp.factoresRiesgoAntecedentesIvu =='SI' ||resp.factoresRiesgoAntecedentesIvu =='S' ){
              this.elementSIAntecedentes= true
            }
    
    
            
    this.checkboxesDataList  = arr;
    this.sintomasDataList= sintomas;
    this.bacteriasDataList= bacterias;
          }
          );
    
        }
        })


    
  }

  async obtenerPersona(id: string) {
    var numberValue = Number(id);

    this.test1 = await this.personasService.getPersona(Number(id)).toPromise(); 
 
    this.verPersona = this.test1;


    return this.verPersona;


  }

   obtenerMesSeguimiento(nro: string) {
    
if(nro=='1'){
  this.etapaSeguimiento = '6'
}else if (nro=='2') {
  this.etapaSeguimiento = '12'
}else if (nro=='3') {
  this.etapaSeguimiento = '18'
}else if (nro=='4') {
  this.etapaSeguimiento = '24'
}else{
  this.etapaSeguimiento=''
}

  


  }

  obtenerParametros() {

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


    var tipoAborto = new ParametroModelo();
    tipoAborto.codigoParametro = "TIPO_ABORTO";
    tipoAborto.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    this.parametrosService.buscarParametrosFiltrosOrder( tipoAborto, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.listaTipoAbortoParam = resp;
    });

    

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

    var tipoBacteriaParam = new ParametroModelo();
    tipoBacteriaParam.codigoParametro = "TIPO_MICROBIO";
    tipoBacteriaParam.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    this.parametrosService.buscarParametrosFiltrosOrder( tipoBacteriaParam, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.listaTipoBacteria = resp;
    });

    var tipoIvuParam = new ParametroModelo();
    tipoIvuParam.codigoParametro = "TIPO_IVU";
    tipoIvuParam.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    this.parametrosService.buscarParametrosFiltrosOrder( tipoIvuParam, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.listaIVU = resp;
    });


    var clasificacionIvuParam = new ParametroModelo();
    clasificacionIvuParam.codigoParametro = "CLASIFICACION_IVU";
    clasificacionIvuParam.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    this.parametrosService.buscarParametrosFiltrosOrder( clasificacionIvuParam, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.listaClasificacionIVU = resp;
    });


    var severidadIvuParam = new ParametroModelo();
    severidadIvuParam.codigoParametro = "SEVERIDAD_IVU";
    severidadIvuParam.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    this.parametrosService.buscarParametrosFiltrosOrder( severidadIvuParam, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.listaSeveridadIVU = resp;
    });

    var respuestaSexado = new ParametroModelo();
    respuestaSexado.codigoParametro = "LISTA_SEXADO";
    respuestaSexado.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    var respuestaMenopausia = new ParametroModelo();
    respuestaMenopausia.codigoParametro = "LISTA_MENOPAUSIA";
    respuestaMenopausia.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    this.parametrosService.buscarParametrosFiltrosOrder( respuestaMenopausia, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.listaRespuestaMenopausia = resp;
      
    });

    this.parametrosService.buscarParametrosFiltrosOrder( respuestaSexado, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.listaRespuestaSexado = resp;
        console.log(this.listaRespuestaSexado);
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


    var listaHD = new ParametroModelo();
    listaHD.codigoParametro = "HIZO_DIAGNOSTICO";
    listaHD.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    this.parametrosService.buscarParametrosFiltrosOrder( listaHD, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.listaHizoDiagnostico = resp;
      
    });

    
    
  }


  guardar( ) {
    this.cerrarAlertGuardar();
    if ( this.seguimientoForm.invalid ) {
      this.alertGuardar = true;
      return Object.values( this.seguimientoForm.controls ).forEach( control => {

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
    var seguimiento: SeguimientoModelo = new SeguimientoModelo();
    
    seguimiento = this.seguimientoForm.getRawValue();
   

     

    
seguimiento.personas = this.verPersona;
this.obtenerRespuestaCheckSelection();
this.obtenerRespuestaSintomasCheckSelection();
this.obtenerRespuestaBacteriasCheckSelection();
this.getSelectionGermenAislado();
this.getSelectionSintomas();



     
     seguimiento.tipoIs = this.tipoISCheck;
     seguimiento.sintomasIVU = this.tipoSintomasCheck;
     seguimiento.germenAisladoTexto= this.germenAisladoTexto;
     seguimiento.tipoISTexto=this.tipoISTexto;
seguimiento.numero = parseInt(this.numeroSeguimiento);

seguimiento.germenAislado= this.tipoBacteriasCheck;
seguimiento.sintomasIVU=this.tipoSintomasCheck;
seguimiento.usuarioCreacion = this.tokenService.getUserName().toString();
     
      peticion = this.seguimientoService.crearSeguimiento( seguimiento );
    

    peticion.subscribe( resp => {

      var mensajeUpload = '';
      

      Swal.fire({
                icon: 'success',
                title: 'Seguimiento Guardado',
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
    this.seguimientoForm.reset();
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
    return this.seguimientoForm.get('firmaEncargado').invalid && this.seguimientoForm.get('firmaEncargado').touched
  }

  crearFormulario() {

    this.seguimientoForm = this.fb.group({
      idSeguimiento  : [null, [] ],
      historiaIVUUltimaVisitaProyecto: [null, [] ],

      urocultivoPositivo: [null, [] ],

   
    tipoIndividuo: [null, [] ],
    tiempoEvolucionLes: [null, [] ],
    tratamientoGlucocorticoides: [null, [] ],
    dosisDiariaCantidadMg: [null, [] ],
    dosisAcumuladaUltimaVisita: [null, [] ],
    tratamientoInmunosupresoresIs: [null, [] ],
   // tipoIs: [null, [] ],
    otroTipoIs: [null, [] ],
    dosis: [null, [] ],
    presentaManifestacionRenal: [null, [] ],
    estadoEncuentra: [null, [] ],
    sledaiPuntos0A30: [null, [] ],
    fechaDiagnostico: [null, [] ],
    presentoSintomas:[null, [] ],
   // sintomasIVU: [null, [] ],
   otroSintomasIVU: [null, [] ],
    tipoMicrobio:[null, [] ],
   // germenAislado:[null, [] ],
   otroGermenAislado: [null, [] ],

    tipoAntibiotico:[null, [] ],
    tipoIVU:[null, [] ],
    nroIVUs:[null, [] ],
    menopausia  : [null, []  ],
    edadMenopausia: [null, [] ],
    factoresRiesgoSexualmenteActivo: [null, [] ],
      factoresRiesgoEstreñimientoCronico: [null, [] ],
      factoresRiesgoIncontinenciaUrinaria: [null, [] ],
      factoresRiesgoSondajeVesicalPrevio: [null, [] ],
      factoresRiesgoProcedimientoUrinarioGinecPrevio: [null, [] ],
      factoresRiesgoAntecedentesIvu: [null, [] ],
      factoresRiesgoAntibioticoterapiaUltimaVisita: [null, [] ],
      factoresRiesgoEmbarazo: [null, [] ],
     
      factoresRiesgoLitiasisRenal: [null, [] ],
      factoresRiesgoCorticoides: [null, [] ],
      otrosFactoresRiesgo: [null, [] ],
    personas: [null, [] ], 

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

bacteriuriaAsintomaticaUltimaVisita : [null, [] ],
tipoActividadSexual :  [null, [] ],
infeccionVaginal :  [null, [] ],
nroInfeccionVaginalAnual :  [null, [] ],

factoresRiesgoBajaIngestaliquidos:  [null, [] ],

procedimientoUrinarioGinecPrevioEspecificar: [null, [] ],

recibioProfilaxisAcordeGuias: [null, [] ],


antibioticoterapiaUltimaVisitaEspecificar: [null, [] ],

tratoconAntibioticos: [null, [] ],

tratoconAntibioticosEspecificar: [null, [] ],


tratamientoBacteriuriaAsintomatica: [null, [] ],

tratamientoBacteriuriaAsintomaticaEspecificar: [null, [] ],
factoresRiesgoCancer: [null, [] ],

factoresRiesgoOtrasCausasInmunodepresion: [null, [] ],

otrasCausasInmunodepresionEspecificar : [null, [] ],

antiDNAPositivo: [null, [] ],
complementosBajos: [null, [] ],
factoresRiesgoAnomaliasAnatomicasTractoEspecificar: [null, [] ],

comoHizoDiagnostico: [null, [] ],

/*Sintomas nuevos */

sintomaDisuria: [null, [] ],

sintomaPolaquiuria: [null, [] ],

sintomaTenesmo: [null, [] ],

sintomaHematuria: [null, [] ],

sintomaPresionAbdomen: [null, [] ], //Presión o retorcijones en la parte inferior del abdomen

sintomaUrgencia: [null, [] ],

sintomaFiebre: [null, [] ],

sintomaVomito: [null, [] ],

sintomaDolorLumbar: [null, [] ],

clasificacionIVU: [null, [] ],
severidadIVU: [null, [] ],

anhosHisterectomia: [null, [] ],


fechaIngreso: [null, [] ],


/*nuevos sintomas */

sintomaUrinarioDisuria: [null, [] ],

sintomaUrinarioPolaquiuria: [null, [] ],

sintomaUrinarioTenesmo: [null, [] ],

sintomaUrinarioDolorSuprapubico: [null, [] ], 

sintomaUrinarioUrgenciaMiccional: [null, [] ],

sintomaUrinarioFiebre: [null, [] ],

sintomasUrinarios: [null, [] ],

otroSintomasUrinarios: [null, [] ],
germenSiAntecedentes: [null, [] ],

     
      fechaCreacion: [null, [] ],
      fechaModificacion: [null, [] ],
      usuarioCreacion: [null, [] ],
      usuarioModificacion: [null, [] ],   
    });

    this.seguimientoForm.get('idSeguimiento').disable();

    this.seguimientoForm.get('fechaCreacion').disable();
    this.seguimientoForm.get('fechaModificacion').disable();
    this.seguimientoForm.get('usuarioCreacion').disable();
    this.seguimientoForm.get('usuarioModificacion').disable(); 
    this.seguimientoForm.get('personas').disable();
     
  }
  cerrarAlertGuardar(){
    this.alertGuardar=false;
  }
 

cuestionariobasal(event, id: number) {
  event.preventDefault();
  this.router.navigate(['inicio/cuestionariobasal', id]);
}


seguimiento(event, id: number) {
  event.preventDefault();
  this.router.navigate(['inicio/seguimiento', id]);
}



getSelectedValue(value:any){

  if(value.toString() =='SI' || value.toString() =='S' ){
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
getSelectedValueTI(valor:any){

  
  if(valor.toString() =='Expuestos factor riesgo (LES)' || valor.toString() =='EFR (LES)'){
    return (this.elementTI = true);
  }else{
    return (this.elementTI = false);
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

getSelectedValueR(valor:any){

  
  if(valor.toString() =='SI' || valor.toString() =='S'){
    return (this.elementR = true);
  }else{
    return (this.elementR = false);
  }
}

getSelectedValuePS(valor:any){


  if(valor.toString() =='SI' || valor.toString() =='S'){
    return (this.elementPS = true);
  }else{
    return (this.elementPS = false);
  }
}

getSelectedValueIV(valor:any){


  if(valor.toString() =='SI' || valor.toString() =='S'){
    return (this.elementIV = true);
  }else{
    return (this.elementIV = false);
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

getSelectedValueTANTB(valor:any){

  
  if(valor.toString() =='SI' || valor.toString() =='S'){
    return (this.elementTANTB = true);
  }else{
    return (this.elementTANTB = false);
  }
}

getSelectedValueBA(valor:any){

  
  if(valor.toString() =='SI' || valor.toString() =='S'){
    return (this.elementBA = true);
  }else{
    return (this.elementBA = false);
  }
}


getSelectedValueTBA(valor:any){

  
  if(valor.toString() =='SI' || valor.toString() =='S'){
    return (this.elementTBA = true);
  }else{
    return (this.elementTBA = false);
  }
}

getSelectedValuePGP(valor:any){

  
  if(valor.toString() =='SI' || valor.toString() =='S'){
    return (this.elementPGP = true);
  }else{
    return (this.elementPGP = false);
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
changeSintomasSelection(value:any, checked: boolean) {
   
 
  if (checked) { 
 
    for (var i=0; i<this.sintomasDataList.length; i++){
      if (this.sintomasDataList[i].descripcion===value){
        this.sintomasDataList[i].isChecked = true; 
      }
    }
  //  this.checkedIDs.push(value);
  } else { //Si el elemento fue deseleccionado
   
    for (var i=0; i<this.sintomasDataList.length; i++){
      if (this.sintomasDataList[i].descripcion===value){
        this.sintomasDataList[i].isChecked = false; 
      }
    }
  }

     
}

changeBacteriasSelection(value:any, checked: boolean) {
   
 
  if (checked) { 
 
    for (var i=0; i<this.bacteriasDataList.length; i++){
      if (this.bacteriasDataList[i].desc===value){
        this.bacteriasDataList[i].isChecked = true; 
      }
    }
  //  this.checkedIDs.push(value);
  } else { //Si el elemento fue deseleccionado
   
    for (var i=0; i<this.bacteriasDataList.length; i++){
      if (this.bacteriasDataList[i].desc===value){
        this.bacteriasDataList[i].isChecked = false; 
      }
    }
  }

     
}

getSelectedValueTS(valor:any){

  
  if(valor.toString() =='SI' || valor.toString() =='S'){
    return (this.elementTS = true);
  }
}

getSelectedValueIU(valor:any){

  
  if(valor.toString() =='SI' || valor.toString() =='S'){
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


getSelectedValueATU(valor:any){


  if(valor.toString() =='SI' || valor.toString() =='S'){
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


  if(valor.toString() =='SI'|| valor.toString() =='S'){
    return (this.elementIVU = true);
  }else{
    return (this.elementIVU = false);
  }
}

getSelectionGermenAislado() {
  for (var i=0; i<this.bacteriasDataList.length; i++){
    if (this.bacteriasDataList[i].isChecked===true){
      this.germenAisladoTexto = this.germenAisladoTexto + this.bacteriasDataList[i].desc + ";";
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

 obtenerRespuestaSintomasCheckSelection(){

  this.tipoSintomasCheck= JSON.stringify(this.sintomasDataList);


 }

 obtenerRespuestaBacteriasCheckSelection(){

  this.tipoBacteriasCheck= JSON.stringify(this.bacteriasDataList);


 }

}
