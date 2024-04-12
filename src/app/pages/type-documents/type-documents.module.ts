import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeDocumentsRoutingModule } from './type-documents-routing.module';
import { DocumentTypeListComponent } from './document-type-list/document-type-list.component';
import { DocumentTypeDialogComponent } from './document-type-dialog/document-type-dialog.component';
import { ComponentsPrimeNg } from 'src/app/components-primeng';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DocumentTypeListComponent,
    DocumentTypeDialogComponent
  ],
  imports: [
    CommonModule,
    TypeDocumentsRoutingModule,
    ComponentsPrimeNg,
    ReactiveFormsModule
  ]
})
export class TypeDocumentsModule { }
