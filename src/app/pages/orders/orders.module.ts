import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { ComponentsPrimeNg } from 'src/app/components-primeng';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemListComponent } from './item-list/item-list.component';


@NgModule({
  declarations: [
    OrderListComponent,
    SupplierListComponent,
    OrderDialogComponent,
    ItemListComponent,

  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ComponentsPrimeNg,
    ReactiveFormsModule
  ]
})
export class OrdersModule { }
