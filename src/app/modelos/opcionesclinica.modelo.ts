import { PersonaModelo } from "./persona.modelo";

export class OpcionesClinicaModelo {

    opcionesClinicaId: number;
    nombre: string;
    descripcion: string;
    fechaCreacion: Date;
    fechaModificacion: Date;
    usuarioCreacion: string;
    usuarioModificacion: string;

    personas: PersonaModelo = new PersonaModelo();


    constructor() {
    }

}
