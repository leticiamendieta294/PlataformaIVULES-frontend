import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { PersonaComponent } from 'src/app/vistas/formularios/persona/persona.component';
import { PersonasComponent } from 'src/app/vistas/listas/personas/personas.component';

import { ParametroComponent } from 'src/app/vistas/formularios/parametro/parametro.component';
import { ParametrosComponent } from 'src/app/vistas/listas/parametros/parametros.component';

import { UsuarioComponent } from 'src/app/vistas/formularios/usuario/usuario.component';
import { UsuariosComponent } from 'src/app/vistas/listas/usuarios/usuarios.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { RouterModule } from '@angular/router';

import { AyudaComponent } from 'src/app/vistas/formularios/ayuda/ayuda.component';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatDividerModule} from '@angular/material/divider';
import { SharedModule } from 'src/app/general/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardService } from 'src/app/vistas/dashboard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { UiSwitchModule } from 'ngx-ui-switch';
import {FileUploadModule} from 'primeng/fileupload';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    DefaultComponent,
    PersonasComponent,
    PersonaComponent,
  
    ParametrosComponent,
    ParametroComponent,
    
    UsuariosComponent,
    UsuarioComponent,
   
    AyudaComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule,
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatAutocompleteModule,
    UiSwitchModule,
    FileUploadModule,
    AngularDualListBoxModule,
    MatButtonModule,
    MatCardModule

  ],
  providers: [
    DashboardService
  ]
})
export class DefaultModule { }
