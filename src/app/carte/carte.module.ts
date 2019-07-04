import { PaginationComponent } from './../components/pagination/pagination.component';
import { FileUploadComponent } from './../components/file-upload/file-upload.component';
import { CarteService } from './services/carte.service';
import { ProductComponent } from './../components/product/product.component';
import { CarteRoutingModule } from './carte.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask/src/currency-mask.config";
import { MatButtonModule, MatIconModule } from '@angular/material'

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [ProductComponent, ListComponent,
    ShowComponent, FormComponent,
    PaginationComponent,
    FileUploadComponent],
  imports: [
    CommonModule,
    CarteRoutingModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  exports: [CarteRoutingModule, ProductComponent, FileUploadComponent, PaginationComponent,
    MatButtonModule]
})
export class CarteModule { }
