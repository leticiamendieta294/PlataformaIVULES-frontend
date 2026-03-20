import { CuestionarioBasalModelo } from './cuestionariobasal.modelo';
import { OpcionesClinicaModelo } from './opcionesclinica.modelo';
import { PersonaModelo } from './persona.modelo';


export class SeguimientoModelo {

    idSeguimiento: number;
    historiaIVUUltimaVisitaProyecto:string;

    urocultivoPositivo: string;

    tratoconAntibioticos:string;

    tratoconAntibioticosEspecificar:string;

  
    tipoIndividuo: string;
    tiempoEvolucionLes: string;
    tratamientoGlucocorticoides: string;
    dosisDiariaCantidadMg: string;
    dosisAcumuladaUltimaVisita: string;
    tratamientoInmunosupresoresIs: string;
    tipoIs: string;
    dosis: string;
    presentaManifestacionRenal: string;
    estadoEncuentra: string;
    sledaiPuntos0A30: string;
    fechaDiagnostico: Date;
    presentoSintomas:string;
    sintomasIVU: string;
    tipoMicrobio:string;
    germenAislado:string;
    tipoAntibiotico:string;
    tipoIVU:string;
    nroIVUs:string;
    factoresRiesgoEmbarazo: string;
    otrosFactoresRiesgo: string;

    factoresRiesgoLitiasisRenal: string;

    factoresRiesgoCorticoides: string;
    factoresRiesgoSexualmenteActivo: string;


    factoresRiesgoEstreñimientoCronico: string;


    factoresRiesgoIncontinenciaUrinaria: string;


    factoresRiesgoSondajeVesicalPrevio: string;


    factoresRiesgoProcedimientoUrinarioGinecPrevio: string;

    factoresRiesgoAntecedentesIvu: string;

    factoresRiesgoAntibioticoterapiaUltimaVisita: string;

    
factoresRiesgoBajaIngestaliquidos: string;

procedimientoUrinarioGinecPrevioEspecificar : string;

recibioProfilaxisAcordeGuias: string;

antibioticoterapiaUltimaVisitaEspecificar : string;

factoresRiesgoCancer : string;

factoresRiesgoOtrasCausasInmunodepresion : string;

otrasCausasInmunodepresionEspecificar :string;

antiDNAPositivo: string;

complementosBajos : string;
comoHizoDiagnostico : string;
factoresRiesgoAnomaliasAnatomicasTractoUrinarioEspecificar : string;

   
    fechaCreacion: Date;
    fechaModificacion: Date;
    usuarioCreacion: string;
    usuarioModificacion: string;
    otroTipoIs: string;
    otroSintomasIVU: string;
    otroGermenAislado: string;
    numero: number;
    personas: PersonaModelo = new PersonaModelo();

    /*Nuevos */

factoresRiesgoSíndromeSjögren: string;
factoresRiesgoTipoEstreñimientoCronico: string;
factoresRiesgoFrecuenciaUrinariaBaja: string;
factoresRiesgoActividadSexualNroVeces: string;
factoresRiesgoTipoIncontinenciaUrinaria: string;
factoresRiesgoEnfermedadRenalCronica: string;
factoresRiesgoHiperplasiaProstáticaBenigna: string;
factoresRiesgoDiabetes: string;
factoresRiesgoAnomaliasAnatomicasTractoUrinario: string;
factoresRiesgoCistocele: string;
factoresRiesgoEstasisCalicialoPelvica: string;
factoresRiesgoLeucopenia: string;
factoresRiesgoTipoLeucopenia: string;
ivusUltimaVisita: string;
firmaEncargado: string;

menopausia: string;
edadMenopausia: string;

tipoActividadSexual : string;
infeccionVaginal: string;
nroInfeccionVaginalAnual : string;

/*Sintomas nuevos */

sintomaDisuria: string;

sintomaPolaquiuria: string;

sintomaTenesmo: string;

sintomaHematuria: string;

sintomaPresionAbdomen: string; //Presión o retorcijones en la parte inferior del abdomen

sintomaUrgencia: string;

sintomaFiebre: string;

sintomaVomito: string;

sintomaDolorLumbar: string;

clasificacionIVU: string;

severidadIVU:string;
bacteriuriaAsintomaticaUltimaVisita :string;

tratamientoBacteriuriaAsintomatica:string;

tratamientoBacteriuriaAsintomaticaEspecificar:string;

factoresRiesgoProcedimientoUrinarioGinecPrevioEspecificar:string;
factoresRiesgoAnomaliasAnatomicasTractoEspecificar: string;


anhosHisterectomia:string;

germenAisladoTexto:string;
tipoISTexto:string;

laboratorioUno:string;
laboratorioDos:string;

laboratorioTres:string;

laboratorioCuatro:string;

fechaIngreso:Date;


/*sintomas urinarios*/

sintomasUrinarios: string;

sintomaUrinarioDisuria: string;

sintomaUrinarioPolaquiuria: string;

sintomaUrinarioTenesmo: string;


sintomaUrinarioDolorSuprapubico: string; //Presión o retorcijones en la parte inferior del abdomen

sintomaUrinarioUrgenciaMiccional: string;

sintomaUrinarioFiebre: string;

otroSintomasUrinarios: string;

/*Germen si Antecedentes */

germenSiAntecedentes: string;



    constructor() {
    }

}