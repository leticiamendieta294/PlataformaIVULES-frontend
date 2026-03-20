import { PersonaModelo } from './persona.modelo';
export class LaboratorioModelo {

    idLaboratorio: number;
    

    leucocitos: string;

    esterasaLeucocitaria: string;

    hematies: string;

    celularidad: string;

    celularidadRedonda : string;

    cilindros: string;

    cilindrosComentarios: string;

    cristales: string;

    cristalesComentarios: string;

    bacteria: string;

    esporosMicoticos: string;

    sedimentoUrinario: string;
    comentarios: string;
    urocultivo:string;
    tipoMicrobio: string;


    germenAislado: string;

    germenAisladoTexto: string;




    tipoBacteria: string;

    blee:string;



    antibiogramaBaciloGramNegativoAmpicilinaSulbactam: string;

    antibiogramaBaciloGramNegativoCeftolozaneTazobactam: string;

    antibiogramaBaciloGramNegativoCeftazidimaAvibactam: string;
    antibiogramaBaciloGramNegativoPiperacilinaTazobactam: string;



    antibiogramaBaciloGramNegativoAmikacina: string;


    antibiogramaBaciloGramNegativoCefazolin: string;

    antibiogramaBaciloGramNegativoImipenem: string;


    antibiogramaBaciloGramNegativoCefalotina: string;

    antibiogramaBaciloGramNegativoCeftolozanetazobactam:string;



    antibiogramaBaciloGramNegativoCeftazidimaavibactam:string;


    antibiogramaBaciloGramNegativoCeftriaxona: string;

    antibiogramaBaciloGramNegativoTigecilina: string;



    antibiogramaBaciloGramNegativoCefepima: string;


    antibiogramaBaciloGramNegativoCiprofloxacina: string;

    antibiogramaCocoGramPositivoOxaciclina: string;


    presenciaGermenResistenteCoco: string;

    antibiogramaBaciloGramNegativoEBSL: string;



    antibiogramaBaciloGramNegativoErtapenem: string;

    antibiogramaBaciloGramNegativoAztreonam: string;



    antibiogramaBaciloGramNegativoFosfomicina: string;



    antibiogramaBaciloGramNegativoGentamicina: string;



    antibiogramaBaciloGramNegativoMeropenem: string;


    antibiogramaBaciloGramNegativoNorfloxacina: string;


    antibiogramaBaciloGramNegativoNitrofurantoína: string;


    antibiogramaBaciloGramNegativoTrimetoprimaSulfametox: string;


    presenciaGermenResistente: string;


   

    antibiogramaCocoGramPositivoAmpicilina: string;


    antibiogramaCocoGramPositivoBenzilpenicilina: string;


    antibiogramaCocoGramPositivoCefoxitinaScreening: string;


    antibiogramaCocoGramPositivoCeftarolina: string;


    antibiogramaCocoGramPositivoCiprofloxacina: string;


    antibiogramaCocoGramPositivoLevofloxacina: string;

    antibiogramaCocoGramPositivoClindamicina: string;

    antibiogramaCocoGramPositivoDaptomicina: string;


    antibiogramaCocoGramPositivoEritromicina: string;


    antibiogramaCocoGramPositivoGentamicinaNivelAlto: string;


    antibiogramaCocoGramPositivoEstreptomicinaNivelAlto: string;

    antibiogramaCocoGramResistenciaClindamicina: string;


    antibiogramaCocoGramPositivoLinezolid: string;


    antibiogramaCocoGramPositivoNitrofurantoína: string;


    antibiogramaCocoGramPositivoRifampicina: string;


    antibiogramaCocoGramPositivoTetraciclina: string;

    
    antibiogramaCocoGramPositivoVancomicina: string;


    antibiogramaCocoGramPositivoTrimetoprimaSulfametoxazol: string;


    hongoAislado: string;


    proteinasPositivo: string;


    sangrePositivo: string;



    

    antibiogramaCocoGramPositivoCefalotina: string;

    /* Tiras* */

    tirasLEU: string;
    tirasNIT: string;
    tirasURO: string;
    tirasPRO: string;
    tiraspH: string;
    tirasBLO: string;
    tirasSG: string;
    tirasKET: string;
    tirasBIL: string;
    tirasGLU: string;

    /*Antifungigrama* */

    antifungigramaFluconazol: string;
    antifungigramaAnfotericinaB: string;
    antifungigramaVoriconazol: string;
    antifungigramaMicafungina: string;
    antifungigramaCaspofungina: string;
    antifungigramaFlucitosina: string;

    /*Recuento Colonias */
    recuentoColoniasNroComentario: string;


    /* Categoria Germen*/

categoriaGermen: string;

/*Persona Encargada */

firmaEncargado: string;

/* fechaIngresoMuestra*/

fechaIngresoMuestra:Date;







    
 
    fechaCreacion: Date;
    fechaModificacion: Date;
    usuarioCreacion: string;
    usuarioModificacion: string;

    otroGermenAislado: string;
    otroHongoAislado: string;
    numero: number;
    personas: PersonaModelo = new PersonaModelo();

    constructor() {
    }

}