import { PersonaModelo } from './persona.modelo';
import { RolModelo } from './rol.modelo';

export class Usuario2Modelo {

    id: number;
    nombreUsuario: string;
    password: string;
    estado: string;
    fechaCreacion: Date;
    usuarioCreacion: string;
    fechaModificacion: Date;
    usuarioModificacion: string;
    roles: Set<RolModelo>;

    constructor() {
    }

}
