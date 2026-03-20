import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './general/layouts/default/default.component';
import { LoginComponent } from './vistas/formularios/login/login.component';
import { PersonasComponent } from './vistas/listas/personas/personas.component';
import { PersonaComponent } from './vistas/formularios/persona/persona.component';

import { ParametrosComponent } from './vistas/listas/parametros/parametros.component';
import { ParametroComponent } from './vistas/formularios/parametro/parametro.component';

import { UsuariosComponent } from './vistas/listas/usuarios/usuarios.component';
import { UsuarioComponent } from './vistas/formularios/usuario/usuario.component';

import { PersonasGuardService as personasguard } from 'src/app/guards/personas-guard.service';

import { UsuariosGuardService as usuariosguard } from 'src/app/guards/usuarios-guard.service';

import { ParametrosGuardService as parametrosguard } from 'src/app/guards/parametros-guard.service';

import { AyudaGuardService as ayudaguard } from 'src/app/guards/ayuda-guard.service';
import { AyudaComponent } from './vistas/formularios/ayuda/ayuda.component';

import { TableroGuardService as tableroguard } from 'src/app/guards/tablero-guard.service';
import { TableroComponent } from './vistas/listas/tablero/tablero.component';


import { ReportesGuardService as reporteguard } from 'src/app/guards/reportes-guard.service';
import { ReportesComponent } from './vistas/listas/reportes/reportes.component';



import { LaboratorioComponent } from './vistas/formularios/laboratorio/laboratorio.component';
import { SeguimientoComponent } from './vistas/formularios/seguimiento/seguimiento.component';
import { CuestionariobasalComponent } from './vistas/formularios/cuestionariobasal/cuestionariobasal.component';
import { SeguimientosComponent } from './vistas/listas/seguimientos/seguimientos.component';

import { LaboratorioGuardService as laboratorioguard } from 'src/app/guards/laboratorio-guard.service';
import { OpcionesClinicaGuardService as opcionesclinicaguard } from 'src/app/guards/opcionesclinica-guard.service';
import { SeguimientoGuardService as seguimientoguard } from 'src/app/guards/seguimiento-guard.service';
import { CuestionarioBasalGuardService as cuestionariobasalguard } from 'src/app/guards/cuestionariobasal-guard.service';
import { OpcionesClinicaComponent } from './vistas/formularios/opcionesclinica/opcionesclinica.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
  path: 'inicio',
  component: DefaultComponent,
  children: [
  {
    path: 'ayuda',canActivate: [ayudaguard], data: { expectedRol: ['admin', 'ayuda'] },
    component: AyudaComponent
  },
  {
    path: 'personas',canActivate: [personasguard], data: { expectedRol: ['admin', 'personas'] },
    component: PersonasComponent
  },{
    path: 'persona/:id',canActivate: [personasguard], data: { expectedRol: ['admin', 'persona'] },
    component: PersonaComponent
  },
  {
    path: 'usuarios',canActivate: [usuariosguard], data: { expectedRol: ['admin', 'usuarios'] },
    component: UsuariosComponent
  },{
    path: 'usuario/:id',canActivate: [usuariosguard], data: { expectedRol: ['admin', 'usuario'] },
    component: UsuarioComponent
  },
  {
    path: 'parametros',canActivate: [parametrosguard], data: { expectedRol: ['admin', 'configuraciones'] },
    component: ParametrosComponent
  },{
    path: 'parametro/:id',canActivate: [parametrosguard], data: { expectedRol: ['admin', 'configuracion'] },
    component: ParametroComponent
  },  
  {
    path: 'laboratorios',canActivate: [laboratorioguard], data: { expectedRol: ['admin', 'laboratorio'] },
    component: LaboratorioComponent
  },{
    path: 'laboratorios/:id',canActivate: [laboratorioguard], data: { expectedRol: ['admin', 'laboratorio'] },
    component: LaboratorioComponent
  },
  {
    path: 'laboratorios/ver/:id/:numero',canActivate: [laboratorioguard], data: { expectedRol: ['admin', 'laboratorio'] },
    component: LaboratorioComponent
  },
  {
    path: 'seguimiento',canActivate: [seguimientoguard], data: { expectedRol: ['admin', 'seguimiento'] },
    component: SeguimientoComponent
  },{
    path: 'seguimiento/ver/:id/:numero',canActivate: [seguimientoguard], data: { expectedRol: ['admin', 'seguimiento'] },
    component: SeguimientoComponent
  },
  {
    path: 'seguimientos',canActivate: [seguimientoguard], data: { expectedRol: ['admin', 'seguimiento'] },
    component: SeguimientosComponent
  },{
    path: 'seguimientos/numero/:numero',canActivate: [seguimientoguard], data: { expectedRol: ['admin', 'seguimiento'] },
    component: SeguimientosComponent
  },

  

 
  {
    path: 'cuestionariobasal',canActivate: [cuestionariobasalguard], data: { expectedRol: ['admin', 'personas'] },
    component: CuestionariobasalComponent
  },{
    path: 'cuestionariobasal/:id',canActivate: [cuestionariobasalguard], data: { expectedRol: ['admin', 'personas'] },
    component: CuestionariobasalComponent
  },{
    path: 'opcionesclinica',canActivate: [opcionesclinicaguard], data: { expectedRol: ['admin', 'opciones'] },
    component: OpcionesClinicaComponent
  },
  {
    path: 'opcionesclinica/:id',canActivate: [opcionesclinicaguard], data: { expectedRol: ['admin', 'opciones'] },
    component: OpcionesClinicaComponent
  },
  {
    path: 'opcionesclinica/personaId',canActivate: [opcionesclinicaguard], data: { expectedRol: ['admin', 'opciones'] },
    component: OpcionesClinicaComponent
  },
  {
    path: 'tablero',canActivate: [tableroguard], data: { expectedRol: ['admin', 'tablero'] },
    component: TableroComponent
  },
  {
    path: 'reportes',canActivate: [reporteguard], data: { expectedRol: ['admin', 'reportes'] },
    component: ReportesComponent
  }
  ]
}];



@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
