import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CarComponent } from './car/car.component';
import {HttpRequestsService} from './services/http-requests.service';
import {CarService} from './services/car.service';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddCarComponent } from './add-car/add-car.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CarDetailsViewComponent } from './car-details-view/car-details-view.component';
import { ValidationFormComponent } from './validation-form/validation-form.component';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CarComponent,
    AddCarComponent,
    CarDetailsViewComponent,
    ValidationFormComponent,
    DropdownComponent,
    ModalComponent
  ],
  exports: [ModalComponent],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    HttpRequestsService,
    CarService
  ],
  bootstrap: [AppComponent, ModalComponent]
})
export class AppModule { }
