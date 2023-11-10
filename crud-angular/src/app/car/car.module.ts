import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarRoutingModule } from './car-routing.module';
import { CarComponent } from './car/car.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { CarFormComponent } from './car-form/car-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CarComponent,
    CarFormComponent
  ],
  imports: [
    CommonModule,
    CarRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule
  ]
})
export class CarModule { }
