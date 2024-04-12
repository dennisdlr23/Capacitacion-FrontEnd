    import { Component, EventEmitter, OnInit, Output } from "@angular/core";
    import { documentType } from "../models/documentType.model";
    import { DocumentTypeService } from "../services/documentType.service";
    import { FormBuilder, FormGroup, Validators } from "@angular/forms";
    import { User } from "src/app/models/user";
    import { Messages } from "src/app/helpers/messages";
    import { AuthService } from "src/app/service/users/auth.service";


    @Component({
    selector: 'app-document-type-dialog',
    templateUrl: './document-type-dialog.component.html',
    styleUrls: ['./document-type-dialog.component.scss']
    })
    export class DocumentTypeDialogComponent implements OnInit {
        @Output() DocumentModify = new EventEmitter<documentType[]>();
        display: boolean = false;
        loading: boolean = false;
        documentModel: documentType;
        formDocument: FormGroup;
        isAdd: boolean = false;
        user: User;

        constructor(
            private documentService: DocumentTypeService,
            private formBuilder: FormBuilder,
            private authService: AuthService

            ) {
                this.user = this.authService.UserValue;
            }

        ngOnInit(): void {
        }

        showDialog( documentModel: documentType, isAdd: boolean){
            this.new();
            this.isAdd = isAdd;
            this.documentModel = documentModel;
            this.display = true;
            this._createForm();

        }
        private _createForm(){
            this.formDocument = this.formBuilder.group({
                id: [this.documentModel.id??0],
                name: [this.documentModel.name??"", Validators.required],
                createdBy: [this.user.userId?? 0],
               


            });
        }

        new(){
            this.documentModel = undefined;
            this.formDocument = undefined;
        }

        async addDocument(){
            if(this.formDocument.valid){
                try{
                    Messages.loading("Agregando", "Agregando Usuario");
                    let document = await this.documentService.addDocumentType(this.formDocument.value);
                    Messages.closeLoading();
                    Messages.Toas("Agregando Correctamente");
                    this.DocumentModify.emit(document);
                    this.display = false;
                }
                catch(ex){
                    Messages.closeLoading();
                    Messages.warning("Advertencia", ex);
                }
            }
        }

        async editDocument() {
            if (this.formDocument.valid) {
                try {
                    Messages.loading("Editando", "Editando Document");

                    const userId = this.user.userId; // Obtener el ID del usuario logueado

                    const currentDate = new Date();
                    this.formDocument.patchValue({
                        updateDate: currentDate.toISOString() // Puedes cambiar el formato de la fecha según tus necesidades
                    });
                    const documentdata = this.formDocument.value;
                    let document = await this.documentService.editDocumentType(documentdata, userId); // Pasar el ID del usuario al servicio
                    Messages.closeLoading();
                    Messages.Toas("Editado Correctamente");
                    this.DocumentModify.emit(document);
                    this.display = false;
                } catch (ex) {
                    Messages.closeLoading();
                    Messages.warning("Advertencia", ex);
                }
            }

        }
    }
