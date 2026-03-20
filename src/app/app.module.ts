import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { interceptorProvider } from 'src/app/interceptors/personas-interceptors.service';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from 'src/app/general/layouts/default/default.module';
import { LoginModule } from './vistas/formularios/login/login.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UiSwitchModule } from 'ngx-ui-switch';
import {FileUploadModule} from 'primeng/fileupload';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { SeguimientoComponent } from './vistas/formularios/seguimiento/seguimiento.component';
import { LaboratorioComponent } from './vistas/formularios/laboratorio/laboratorio.component';
import { CuestionariobasalComponent } from './vistas/formularios/cuestionariobasal/cuestionariobasal.component';
import { OpcionesClinicaComponent } from './vistas/formularios/opcionesclinica/opcionesclinica.component';
import { TableroComponent } from './vistas/listas/tablero/tablero.component';
import { ReportesComponent } from './vistas/listas/reportes/reportes.component';
import { DataTablesModule } from 'angular-datatables';
import { SeguimientosComponent } from './vistas/listas/seguimientos/seguimientos.component';


@NgModule({
  declarations: [
    AppComponent,
    SeguimientoComponent,
    LaboratorioComponent,
    CuestionariobasalComponent,
    OpcionesClinicaComponent,
    TableroComponent,
    ReportesComponent,
    SeguimientosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    LoginModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FontAwesomeModule,
    NgbModule,
    MatFormFieldModule,
    UiSwitchModule,
    FileUploadModule,
    MatButtonModule,
    MatCardModule,
    DataTablesModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
