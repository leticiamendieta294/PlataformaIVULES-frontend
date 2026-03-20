import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { LaboratorioModelo } from '../../../modelos/laboratorio.modelo';
import { ParametroModelo } from '../../../modelos/parametro.modelo';
import { ComunesService } from 'src/app/servicios/comunes.service';


import { LaboratorioService } from '../../../servicios/laboratorio.service';
import { ParametrosService } from '../../../servicios/parametros.service';


import Swal from 'sweetalert2';
import { TokenService } from 'src/app/servicios/token.service';
import { PersonasService } from 'src/app/servicios/personas.service';
import { PersonaModelo } from 'src/app/modelos/persona.modelo';
@Component({
  selector: 'app-laboratorio',
  templateUrl: './laboratorio.component.html',
  styleUrls: ['./laboratorio.component.css']
})
export class LaboratorioComponent implements OnInit {

  crear = false;
  laboratorioForm: FormGroup;
  listaRespuesta: ParametroModelo;
  listaELeucocitaria: ParametroModelo;
  listaBacteria: ParametroModelo;
  listaNormal: ParametroModelo;
  listaTipoMicrobio: ParametroModelo;
  listaTipoBacteria: ParametroModelo;
  listaRespuestaUP : ParametroModelo;
  public verPersona : PersonaModelo = new PersonaModelo();
  private test1;
  public laboratorioS:any;

  ckAntifungigramaFluconazol : string;
  isFluconazolSensible = false;
  isFluconazolIntermedio = true;
  isFluconazolResistente = false;
  ckAntifungigramaAnfotericinaB: string;
  ckAntifungigramaVoriconazol: string;
  ckAntifungigramaMicafungina: string;
  ckAntifungigramaCaspofungina: string;
  ckAntifungigramaFlucitosina: string;


  listaNegativoPositivo: ParametroModelo;

  listaHongoAislado: ParametroModelo;

  alertGuardar:boolean=false;
  progress = 0;
  message = '';  

  numeroLaboratorio='';
  germenAisladoTexto='';

  etapaLaboratorio='';

  

  selectedItemsList = [];
  checkedbIDs = [];
  

  bacteriasDataList = [
    {
      id: 'C001',
      label: 'Escherichia coli',
      isChecked: false,
      recuentoColoniasNro : 0,
      recuentoColoniasUM : 'UFC/ml'

    },
    {
      id: 'C002',
      label: 'Klebsiella pneumoniae',
      isChecked: false,
      recuentoColoniasNro : 0,
      recuentoColoniasUM : 'UFC/ml'
      
    },
    {
      id: 'C003',
      label: 'Proteus mirabilis',
      isChecked: false,
      recuentoColoniasNro : 0,
      recuentoColoniasUM : 'UFC/ml'
    },
    {
      id: 'C004',
      label: 'Pseudomonas spp.',
      isChecked: false,
      recuentoColoniasNro : 0,
      recuentoColoniasUM : 'UFC/ml'
    },
    {
      id: 'C004',
      label: 'Staphylococcus saprophyticus',
      isChecked: false,
      recuentoColoniasNro : 0,
      recuentoColoniasUM : 'UFC/ml'
    },
    {
      id: 'C005',
      label: 'Streptococcus agalactiae',
      isChecked: false,
      recuentoColoniasNro : 0,
      recuentoColoniasUM : 'UFC/ml'
    }
    ,
    {
      id: 'C006',
      label: 'Enterococcus faecalis',
      isChecked: false,
      recuentoColoniasNro : 0,
      recuentoColoniasUM : 'UFC/ml'
    }
    ,
    {
      id: 'C007',
      label: 'Serratia marcenses',
      isChecked: false,
      recuentoColoniasNro : 0,
      recuentoColoniasUM : 'UFC/ml'
    }
    ,
    {
      id: 'C008',
      label: 'Morganella morganii',
      isChecked: false,
      recuentoColoniasNro : 0,
      recuentoColoniasUM : 'UFC/ml'
    }
    ,
    {
      id: 'C009',
      label: 'Acinetobacter baumannii',
      isChecked: false,
      recuentoColoniasNro : 0,
      recuentoColoniasUM : 'UFC/ml'
    }
    
    
  ]
  tipoBacteriasCheck: string;

  nombrePersona = '';

  element = false;

  elementG = false;

  elementB = false;

  elementCoco = false;

  elementCandida = false;

  elementCategoriaGermen = false;

  constructor(private tokenService: TokenService,
    private laboratorioService: LaboratorioService,
    private parametrosService: ParametrosService,
    private comunes: ComunesService,
    private personasService: PersonasService,
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

    this.obtenerMesLaboratorio(nro);

    this.numeroLaboratorio = nro;
   
    this.laboratorioService.getLaboratorioByPersonaIdAndNumero(Number(id), Number(nro))
      .subscribe( resp => {      
        this.laboratorioS = resp;
        
        if (this.laboratorioS ===null) {
          this.crear == true;
        }else{
         this.laboratorioService.getLaboratorio( this.laboratorioS.idLaboratorio )
          .subscribe( (resp: LaboratorioModelo) => {
           
         //   this.bacteriasDataList= [];

         

           

       /*     this.ckAntifungigramaFluconazol = resp.antifungigramaFluconazol;
            this.ckAntifungigramaAnfotericinaB = resp.antifungigramaAnfotericinaB;
            this.ckAntifungigramaCaspofungina = resp.antifungigramaCaspofungina;
            this.ckAntifungigramaFlucitosina = resp.antifungigramaFlucitosina;
            this.ckAntifungigramaMicafungina = resp.antifungigramaMicafungina;
            this.ckAntifungigramaVoriconazol = resp.antifungigramaVoriconazol;
*/
            
      
       
        let bacterias = JSON.parse(resp.germenAislado);
       
         resp.germenAislado=null;  

       /*  resp.antifungigramaFluconazol = null;

         resp.antifungigramaAnfotericinaB = null;

         resp.antifungigramaCaspofungina= null;

         resp.antifungigramaFlucitosina = null;

         resp.antifungigramaMicafungina = null;

         resp.antifungigramaVoriconazol = null;*/



            this.laboratorioForm.patchValue(resp);

          

            if(resp.urocultivo =='POSITIVO'){
              this.element = true
            }

       

            if(resp.tipoMicrobio =='Bacteriano'){
              this.elementG = true
            }else if(resp.tipoMicrobio =='Micótico'){
              this.elementCandida = true

             
            }

            if (resp.tipoBacteria!=null) {
              if(resp.tipoBacteria.toString() =='Bacilo Gram negativo' || resp.tipoBacteria.toString() == 'Bacilo Gram positivo'){
                this.elementB = true
              }else  if(resp.tipoBacteria.toString() =='Coco Gram negativo' || resp.tipoBacteria.toString() == 'Coco Gram positivo'){
                this.elementCoco = true
              }else{
              this.elementG = false
              this.elementCoco = false
              
            }
            }
            


          
          
          

    
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

   obtenerMesLaboratorio(nro: string) {
    
if(nro=='1'){
  this.etapaLaboratorio = '6'
}else if (nro=='2') {
  this.etapaLaboratorio = '12'
}else if (nro=='3') {
  this.etapaLaboratorio = '18'
}else if (nro=='4') {
  this.etapaLaboratorio = '24'
}else{
  this.etapaLaboratorio=''
}

  


  }


  obtenerParametros() {
    

    var eLeucocitariaParam = new ParametroModelo();
    eLeucocitariaParam.codigoParametro = "EST_LEUCOCITARIA";
    eLeucocitariaParam.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    this.parametrosService.buscarParametrosFiltrosOrder( eLeucocitariaParam, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.listaELeucocitaria = resp;
    });


    var bacteriaParam = new ParametroModelo();
    bacteriaParam.codigoParametro = "BACTERIA";
    bacteriaParam.descripcion = "bacteria"
    bacteriaParam.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    this.parametrosService.buscarParametrosFiltrosOrder( bacteriaParam, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.listaBacteria = resp;
    });


    var normalParam = new ParametroModelo();
    normalParam.codigoParametro = "LIST_NORMAL";
    normalParam.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    this.parametrosService.buscarParametrosFiltrosOrder( normalParam, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.listaNormal = resp;
    });


    var tipoMicrobioParam = new ParametroModelo();
    tipoMicrobioParam.codigoParametro = "TIPO_MICROBIO";
    tipoMicrobioParam.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    this.parametrosService.buscarParametrosFiltrosOrder( tipoMicrobioParam, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.listaTipoMicrobio = resp;
    });

    var tipoBacteriaParam = new ParametroModelo();
    tipoBacteriaParam.codigoParametro = "TIPO_BACT";
    tipoBacteriaParam.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    this.parametrosService.buscarParametrosFiltrosOrder( tipoBacteriaParam, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.listaTipoBacteria = resp;
    });


    var listaNPParam = new ParametroModelo();
    listaNPParam.codigoParametro = "LIST_NP";
    listaNPParam.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    this.parametrosService.buscarParametrosFiltrosOrder( listaNPParam, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.listaNegativoPositivo = resp;
    });
    

    var hongoAisladoParam = new ParametroModelo();
    hongoAisladoParam.codigoParametro = "HONGO_AISLADO";
    hongoAisladoParam.descripcionValor = "Candida spp.";
    hongoAisladoParam.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    this.parametrosService.buscarParametrosFiltrosOrder( hongoAisladoParam, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.listaHongoAislado = resp;
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


    var upParam = new ParametroModelo();
    upParam.codigoParametro = "UROCULTIVO_L";
    upParam.estado = "A";
    var orderBy = "descripcionValor";
    var orderDir = "desc";

    this.parametrosService.buscarParametrosFiltrosOrder( upParam, orderBy, orderDir )
      .subscribe( (resp: ParametroModelo) => {
        this.listaRespuestaUP = resp;
    });
    
  }


  guardar( ) {
    this.cerrarAlertGuardar();
    if ( this.laboratorioForm.invalid ) {
      this.alertGuardar = true;
      return Object.values( this.laboratorioForm.controls ).forEach( control => {

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
    var laboratorio: LaboratorioModelo = new LaboratorioModelo();
    
    laboratorio = this.laboratorioForm.getRawValue();
  

    laboratorio.personas = this.verPersona;

this.obtenerRespuestaBacteriasCheckSelection();
this.getBacteriasSelection();




     
     laboratorio.germenAislado= this.tipoBacteriasCheck;
     laboratorio.germenAisladoTexto= this.germenAisladoTexto;
laboratorio.numero = parseInt(this.numeroLaboratorio);



laboratorio.germenAislado= this.tipoBacteriasCheck;

laboratorio.usuarioCreacion = this.tokenService.getUserName().toString();


     
      peticion = this.laboratorioService.crearLaboratorio( laboratorio );
    

    peticion.subscribe( resp => {

      var mensajeUpload = '';
      

      Swal.fire({
                icon: 'success',
                title: 'Laboratorio Guardado',
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
    this.laboratorioForm.reset();
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
    return this.laboratorioForm.get('firmaEncargado').invalid && this.laboratorioForm.get('firmaEncargado').touched
  }

  get tirasLEUNoValido() {
    return this.laboratorioForm.get('tirasLEU').invalid && this.laboratorioForm.get('tirasLEU').touched
  }

  get tirasNITNoValido() {
    return this.laboratorioForm.get('tirasNIT').invalid && this.laboratorioForm.get('tirasNIT').touched
  }


  get tirasURONoValido() {
    return this.laboratorioForm.get('tirasURO').invalid && this.laboratorioForm.get('tirasURO').touched
  }

  get tirasPRONoValido() {
    return this.laboratorioForm.get('tirasPRO').invalid && this.laboratorioForm.get('tirasPRO').touched
  }

  get tiraspHNoValido() {
    return this.laboratorioForm.get('tiraspH').invalid && this.laboratorioForm.get('tiraspH').touched
  }

  get tirasBLONoValido() {
    return this.laboratorioForm.get('tirasBLO').invalid && this.laboratorioForm.get('tirasBLO').touched
  }

  get tirasSGNoValido() {
    return this.laboratorioForm.get('tirasSG').invalid && this.laboratorioForm.get('tirasSG').touched
  }

  get tirasKETNoValido() {
    return this.laboratorioForm.get('tirasKET').invalid && this.laboratorioForm.get('tirasKET').touched
  }


  get tirasBILNoValido() {
    return this.laboratorioForm.get('tirasBIL').invalid && this.laboratorioForm.get('tirasBIL').touched
  }

  get tirasGLUNoValido() {
    return this.laboratorioForm.get('tirasGLU').invalid && this.laboratorioForm.get('tirasGLU').touched
  }


  crearFormulario() {

    this.laboratorioForm = this.fb.group({
      idLaboratorio  : [null, [] ],
      leucocitos: [null, [] ],
      esterasaLeucocitaria: [null, [] ],
      hematies: [null, [] ],
      celularidad: [null, [] ],
      celularidadRedonda: [null, [] ],
      cilindros: [null, [] ],
      cilindrosComentarios: [null, [] ],
      cristales: [null, [] ],
      cristalesComentarios: [null, [] ],
      bacteria: [null, [] ],
      esporosMicoticos: [null, [] ],
      sedimentoUrinario: [null, [] ],
      comentarios: [null, [] ],
      urocultivo: [null, [] ],
      tipoMicrobio: [null, [] ],
     // germenAislado: [null, [] ],
      otroGermenAislado: [null, [] ],

      tipoBacteria: [null, [] ],
      blee: [null, [] ],
      antibiogramaBaciloGramNegativoAmpicilinaSulbactam: [null, [] ],
      antibiogramaBaciloGramNegativoAmikacina:[null, [] ],
      antibiogramaBaciloGramNegativoCefazolin: [null, [] ],
      antibiogramaBaciloGramNegativoCefalotina:[null, [] ],
      antibiogramaBaciloGramNegativoCeftazidima:[null, [] ],
      antibiogramaBaciloGramNegativoCeftriaxona:[null, [] ],
      antibiogramaBaciloGramNegativoCefepima:[null, [] ],
      antibiogramaBaciloGramNegativoCiprofloxacina:[null, [] ],
      antibiogramaBaciloGramNegativoEBSL:[null, [] ],
      antibiogramaBaciloGramNegativoAztreonam:[null, [] ],
      antibiogramaBaciloGramNegativoCeftolozanetazobactam:[null, [] ],
      antibiogramaBaciloGramNegativoCeftazidimaavibactam:[null, [] ],
      antibiogramaBaciloGramNegativoImipenem:[null, [] ],
      antibiogramaBaciloGramNegativoPiperacilinaTazobactam:[null, [] ],
      
      antibiogramaBaciloGramNegativoTigecilina: [null, [] ],

      antibiogramaBaciloGramNegativoErtapenem: [null, [] ],
      antibiogramaBaciloGramNegativoFosfomicina :[null, [] ],
      antibiogramaBaciloGramNegativoGentamicina: [null, [] ],
      antibiogramaBaciloGramNegativoMeropenem:[null, [] ],
      antibiogramaBaciloGramNegativoNorfloxacina:[null, [] ],
      antibiogramaBaciloGramNegativoNitrofurantoína:[null, [] ],
      antibiogramaBaciloGramNegativoTrimetoprimaSulfametox:[null, [] ],
      presenciaGermenResistente:[null, [] ],
      antibiogramaCocoGramPositivoAmpicilina:[null, [] ],
      antibiogramaCocoGramPositivoBenzilpenicilina:[null, [] ],
      antibiogramaCocoGramPositivoCefoxitinaScreening:[null, [] ],
      antibiogramaCocoGramPositivoCeftarolina:[null, [] ],
      antibiogramaCocoGramPositivoCefalotina:[null, [] ],
      antibiogramaCocoGramPositivoCiprofloxacina:[null, [] ],


      antibiogramaCocoGramPositivoLevofloxacina: [null, [] ],
      antibiogramaCocoGramPositivoClindamicina :[null, [] ],
      antibiogramaCocoGramPositivoDaptomicina: [null, [] ],
      antibiogramaCocoGramPositivoEritromicina:[null, [] ],
      antibiogramaCocoGramPositivoGentamicinaNivelAlto:[null, [] ],
      antibiogramaCocoGramPositivoEstreptomicinaNivelAlto:[null, [] ],
      antibiogramaCocoGramResistenciaClindamicina:[null, [] ],
      antibiogramaCocoGramPositivoLinezolid:[null, [] ],
      antibiogramaCocoGramPositivoNitrofurantoína:[null, [] ],
      antibiogramaCocoGramPositivoOxaciclina:[null, [] ],
      antibiogramaCocoGramPositivoRifampicina:[null, [] ],

      antibiogramaCocoGramPositivoTetraciclina: [null, [] ],
      antibiogramaCocoGramPositivoVancomicina :[null, [] ],
      antibiogramaCocoGramPositivoTrimetoprimaSulfametoxazol: [null, [] ],
      presenciaGermenResistenteCoco: [null, [] ],
      hongoAislado:[null, [] ],
      otroHongoAislado: [null, [] ],

      proteinasPositivo:[null, [] ],
      sangrePositivo:[null, [] ],


      /* Tiras* */

    tirasLEU: [null, Validators.min(0)],
    tirasNIT: [null, Validators.min(0) ],
    tirasURO: [null, Validators.min(0) ],
    tirasPRO: [null, Validators.min(0) ],
    tiraspH: [null, [Validators.min(5), Validators.max(9)]],
    tirasBLO: [null, Validators.min(0) ],
    tirasSG: [null, [Validators.min(1000), Validators.max(1030)] ],
    tirasKET: [null, Validators.min(0) ],
    tirasBIL: [null, Validators.min(0) ],
    tirasGLU: [null, Validators.min(0) ],

    /*Antifungigrama* */

    antifungigramaFluconazol: [null, [] ],
    antifungigramaAnfotericinaB: [null, [] ],
    antifungigramaVoriconazol: [null, [] ],
    antifungigramaMicafungina: [null, [] ],
    antifungigramaCaspofungina: [null, [] ],
    antifungigramaFlucitosina: [null, [] ],

    /*Recuento colonias */

    recuentoColoniasNroComentario:  [null, [] ],
   

    /* Categoria Germen*/

categoriaGermen: [null, [] ],

/*Persona Encargada */

firmaEncargado: [null, [Validators.required] ],

   

fechaIngresoMuestra: [null, [] ],





      fechaCreacion: [null, [] ],
      fechaModificacion: [null, [] ],
      usuarioCreacion: [null, [] ],
      usuarioModificacion: [null, [] ],   
      personas: [null, [] ], 
    });

    this.laboratorioForm.get('idLaboratorio').disable();

    this.laboratorioForm.get('fechaCreacion').disable();
    this.laboratorioForm.get('fechaModificacion').disable();
    this.laboratorioForm.get('usuarioCreacion').disable();
    this.laboratorioForm.get('usuarioModificacion').disable(); 
    this.laboratorioForm.get('personas').disable();   
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


opciones(event) {
  event.preventDefault();
  this.router.navigate(['inicio/opcionesclinica',this.verPersona.personaId]);
}

valor: string;

changeBacteriasSelection(value:any, checked: boolean) {
 
  
  if (checked) { 
 
    for (var i=0; i<this.bacteriasDataList.length; i++){
      if (this.bacteriasDataList[i].label===value){
        this.bacteriasDataList[i].isChecked = true; 
       
      }
    }
  //  this.checkedIDs.push(value);
  } else { //Si el elemento fue deseleccionado
   
    for (var i=0; i<this.bacteriasDataList.length; i++){
      if (this.bacteriasDataList[i].label===value){
        this.bacteriasDataList[i].isChecked = false; 
        
        
      }
    }
  }

     
}


getBacteriasSelection() {
 
  
 
 
    for (var i=0; i<this.bacteriasDataList.length; i++){
      if (this.bacteriasDataList[i].isChecked===true){
        this.germenAisladoTexto = this.germenAisladoTexto + this.bacteriasDataList[i].label+ "," +  this.bacteriasDataList[i].recuentoColoniasNro +";"; 
       
      }
    }
  //  this.checkedIDs.push(value);
  

     
}

changeBacteriasInputSelection(value:any, val:any) {
   



 
    for (var i=0; i<this.bacteriasDataList.length; i++){
      if (this.bacteriasDataList[i].label===value){
        this.bacteriasDataList[i].recuentoColoniasNro = val; 
      }
    
  //  this.checkedIDs.push(value);
  }
}
     

changeCocoSelection(value:any, checked: boolean, val:any) {
   
 
  if (checked) { 
 
    for (var i=0; i<this.bacteriasDataList.length; i++){
      if (this.bacteriasDataList[i].label===value){
        this.bacteriasDataList[i].isChecked = true; 
        this.bacteriasDataList[i].recuentoColoniasNro = val; 
      }
    }
  //  this.checkedIDs.push(value);
  } else { //Si el elemento fue deseleccionado
   
    for (var i=0; i<this.bacteriasDataList.length; i++){
      if (this.bacteriasDataList[i].label===value){
        this.bacteriasDataList[i].isChecked = false; 
        this.bacteriasDataList[i].recuentoColoniasNro = 0; 
      }
    }
  }

     
}

changeCocoInputSelection(value:any,checked: boolean, val:any) {
   
 
  if (checked) { 
 
    for (var i=0; i<this.bacteriasDataList.length; i++){
      if (this.bacteriasDataList[i].label===value){
        this.bacteriasDataList[i].isChecked = true; 
        this.bacteriasDataList[i].recuentoColoniasNro = val; 
      }
    }
  //  this.checkedIDs.push(value);
  } else { //Si el elemento fue deseleccionado
   
    for (var i=0; i<this.bacteriasDataList.length; i++){
      if (this.bacteriasDataList[i].label===value){
        this.bacteriasDataList[i].isChecked = false; 
        this.bacteriasDataList[i].recuentoColoniasNro = 0; 
      }
    }
  }

     
}
obtenerRespuestaBacteriasCheckSelection(){

  this.tipoBacteriasCheck= JSON.stringify(this.bacteriasDataList);


 }

 getSelectedValueR(value:any){

  if(value.toString() =='POSITIVO'){
    return (this.element = true);
  } else {
    return (this.element = false);
  }

  
}



getSelectedValueG(value:any){
 

  if(value.toString() =='Bacteriano'){
    return (this.elementG = true,this.elementCandida = false );

  }else if (value.toString() =='Micótico'){
    return (this.elementCandida = true, this.elementG = false, this.elementCoco = false,this.elementB =false);
  }else{
    return (this.elementCandida = false, this.elementG = false, this.elementCoco = false,this.elementB =false);
  }

  
}

getSelectedValueB(value:any){

  if(value.toString() =='Bacilo Gram negativo' || value.toString() =='Bacilo Gram positivo'){
    return (this.elementB = true, this.elementCoco = false);
  }else if(value.toString() =='Coco Gram negativo' || value.toString() =='Coco Gram positivo') {
    return (this.elementCoco = true,this.elementB =false);
  }else{
    return (this.elementCoco = false,this.elementB =false);
  }

  
}


getSelectedValueCategoriaGermen(value:any){


  if(value.toString() =='S' ){
    return (this.elementCategoriaGermen = true);
  }else{
    return (this.elementCategoriaGermen = false);
  }

  
}

setCheck(e: Event,value:any){

  e.preventDefault();


 this.laboratorioForm.controls[value].reset();

}

controlarCheckboxFluconazol(value:any, checked:any) {
 
  if (!checked) {
    this.ckAntifungigramaFluconazol = null;

  }else{
    this.ckAntifungigramaFluconazol = value;

  }
}

controlarCheckboxAnfotericina(value:any, checked:any) {

  if (!checked) {
    this.ckAntifungigramaAnfotericinaB = null;

  }else{
 this.ckAntifungigramaAnfotericinaB = value;
}

}

controlarCheckboxVoriconazol(value:any, checked:any) {
  if (!checked) {
    this.ckAntifungigramaVoriconazol = null;

  }else{
 this.ckAntifungigramaVoriconazol = value;
}
}





controlarCheckboxMicafungina(value:any, checked:any) {
  if (!checked) {
    this.ckAntifungigramaMicafungina = null;

  }else{
 this.ckAntifungigramaMicafungina = value;
}

}

controlarCheckboxCaspofungina(value:any, checked:any) {
  if (!checked) {
    this.ckAntifungigramaCaspofungina = null;

  }else{
 this.ckAntifungigramaCaspofungina = value;
}
}

controlarCheckboxFlucitosina(value:any, checked:any) {
  if (!checked) {
    this.ckAntifungigramaFlucitosina = null;

  }else{
 this.ckAntifungigramaFlucitosina = value;
}

}









}
