import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { DetailComponent } from './detail/detail.component';
import {ApiServiceService} from './shared/services/api-service.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EmpresaModalComponent } from './empresa-modal/empresa-modal.component';
import { UbicacionModalComponent } from './ubicacion-modal/ubicacion-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    DetailComponent,
    EmpresaModalComponent,
    UbicacionModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    EmpresaModalComponent,
    UbicacionModalComponent
  ],
  providers: [ApiServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
