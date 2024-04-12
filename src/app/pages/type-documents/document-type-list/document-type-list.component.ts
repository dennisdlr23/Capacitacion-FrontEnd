    import { Component, OnInit, ViewChild } from "@angular/core";
    import { DocumentTypeDialogComponent } from '../document-type-dialog/document-type-dialog.component';
    import { documentType } from "../models/documentType.model";
    import { DocumentTypeService } from "../services/documentType.service";
    import { AuthService } from "src/app/service/users/auth.service";
    import { Messages } from "src/app/helpers/messages";


    @Component({
    selector: 'app-document-type-list',
    templateUrl: './document-type-list.component.html',
    styleUrls: ['./document-type-list.component.scss']
    })
    export class DocumentTypeListComponent implements OnInit {
        @ViewChild(DocumentTypeDialogComponent) DocumentDialog: DocumentTypeDialogComponent;
        loading: boolean = false;
        document: documentType[] = [];
        title: string = "Listado de Documents"

    constructor(
        private documentTypeService: DocumentTypeService,
        private auth: AuthService,

        ) { }

    ngOnInit(): void {
        this._getDocument();
    }

    async _getDocument(){
        try{
            this.loading = true;
            Messages.loading("Cargando...", "Espere un momento.");
            this.document = await this.documentTypeService.getDocumentType();
            Messages.closeLoading();
            this.loading = false;
        } catch (ex) {
            Messages.closeLoading();
            Messages.warning(ex);
        }
    }
    addEDocument(){
        this.DocumentDialog.showDialog(new documentType(), true);
    }
    editDocument(document: documentType){
        this.DocumentDialog.showDialog(document, false);
    }

    async deleteDocument(document: documentType) {
        try {
            const confirmDelete = confirm('¿Estás seguro de que quieres eliminar este documento?');
            if (confirmDelete) {
                Messages.loading("Eliminando...", "Espere un momento.");
                await this.documentTypeService.deleteDocumentType(document);
                Messages.closeLoading();
                Messages.Toas("Documento eliminado correctamente.");
                this._getDocument(); // Volver a cargar la lista después de eliminar el documento
            }
        } catch (ex) {
            Messages.closeLoading();
            Messages.warning(ex);
        }
    }
    documentModify(document: documentType[]){
        this.document = document;
    }


    }
