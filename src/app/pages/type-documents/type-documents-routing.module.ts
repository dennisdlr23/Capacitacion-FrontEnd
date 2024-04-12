import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentTypeListComponent } from './document-type-list/document-type-list.component';

const routes: Routes = [
    {
        path:'',
        children: [
            {
                path: 'documentos-lista',
                component: DocumentTypeListComponent,
            },
            { path: '**', redirectTo: ''},
        ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeDocumentsRoutingModule { }
