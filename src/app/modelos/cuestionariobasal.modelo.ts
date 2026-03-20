import { OpcionesClinicaModelo } from "./opcionesclinica.modelo";
import { PersonaModelo } from "./persona.modelo";
import { Persona2Modelo } from "./persona2.modelo";

export class CuestionarioBasalModelo {

    cuestionarioId: number;
    fecha: Date;
    fechaCreacion: Date;
    fechaModificacion: Date;
    usuarioCreacion: string;
    usuarioModificacion: string;
    participaEstudio: string;


    urocultivoPositivo: string;


    menopausia: string;


    edadMenopausia: string;


    factoresRiesgoSexualmenteActivo: string;


    factoresRiesgoEstreñimientoCronico: string;


    factoresRiesgoIncontinenciaUrinaria: string;


    factoresRiesgoSondajeVesicalPrevio: string;


    factoresRiesgoProcedimientoUrinarioGinecPrevio: string;

    factoresRiesgoAntecedentesIvuUltimoAnho: string;

    factoresRiesgoAntibioticoterapiaUltimos6m: string;


    factoresRiesgoAborto: string;

    factoresRiesgoLitiasisRenal: string;

    factoresRiesgoCorticoides: string;

    nroIvusUltimo12meses: string;

    tipoIndividuo: string;

    tiempoEvolucionLes: string;

    tratamientoGlucocorticoides: string;

    dosisDiariaCantidadMg: string;

    dosisAcumuladaUltimo6meses: string;

    tratamientoInmunosupresoresIs: string;

    tipoIs: string;

    dosis: string;

    presentaManifestacionRenal: string;

    estadoEncuentra: string;

    sledaiPuntos0A30: string;

    factoresRiesgoEmbarazo: string;

    otrosFactoresRiesgo: string;

    otroTipoIs: string;
   
    personas : PersonaModelo;

    /*Nuevos */

    factoresRiesgoSindromeSjogren: string;
factoresRiesgoTipoEstreñimientoCronico: string;
factoresRiesgoFrecuenciaUrinariaBaja: string;
factoresRiesgoActividadSexualNroVeces: string;
factoresRiesgoTipoIncontinenciaUrinaria: string;
factoresRiesgoEnfermedadRenalCronica: string;
factoresRiesgoHiperplasiaProstaticaBenigna: string;
factoresRiesgoDiabetes: string;
factoresRiesgoAnomaliasAnatomicasTractoUrinario: string;
factoresRiesgoLeucopenia: string;
factoresRiesgoTipoLeucopenia: string;
ivusUltimo12meses: string;

infeccionVaginal :  string;
nroInfeccionVaginalAnual :string;
firmaEncargado: string;


factoresRiesgoBajaIngestaliquidos: string;

procedimientoUrinarioGinecPrevioEspecificar : string;

recibioProfilaxisAcordeGuias: string;

antibioticoterapiaUltimos6mEspecificar : string;

factoresRiesgoCancer : string;

factoresRiesgoOtrasCausasInmunodepresion : string;

otrasCausasInmunodepresionEspecificar :string;

antiDNAPositivo: string;

complementosBajos : string;
factoresRiesgoProcedimientoUrinarioGinecPrevioEspecificar:string;
factoresRiesgoAnomaliasAnatomicasTractoEspecificar: string;
anticuerposSAFpositivos: string;


tipoISTexto : string;

sintomasUrinarios: string;

sintomaDisuria: string;

sintomaPolaquiuria: string;

sintomaTenesmo: string;


sintomaDolorSuprapubico: string; //Presión o retorcijones en la parte inferior del abdomen

sintomaUrgenciaMiccional: string;

sintomaFiebre: string;

otroSintomasIVU: string;

fechaIngreso:Date;



anhosHisterectomia : string;

/*Germen si Antecedentes */

germenSiAntecedentes: string;



    constructor() {
    }

}