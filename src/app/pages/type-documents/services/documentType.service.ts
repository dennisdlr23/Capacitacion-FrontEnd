import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { documentType } from "../models/documentType.model";

@Injectable({providedIn: 'root'})
export class DocumentTypeService {

    constructor( private http: HttpClient ) { }

    async getDocumentType(){
        return firstValueFrom(
            this.http.get<documentType[]>(
                `${ environment.uriLogistic}/api/TypeDocument`
            )
        );
    }

    async addDocumentType(documentType:documentType) {
        return await firstValueFrom(this.http.post<documentType[]>(`${environment.uriLogistic}/api/TypeDocument`, documentType));
      }

      async editDocumentType(documentType: documentType, userId: number) {
        return await firstValueFrom(this.http.put<documentType[]>(`${environment.uriLogistic}/api/TypeDocument/${userId}`, documentType));
    }

      async deleteDocumentType(documentType: documentType): Promise<documentType[]> {
        return await firstValueFrom(this.http.delete<documentType[]>(`${environment.uriLogistic}/api/TypeDocument/${documentType.id}`));
      }

    }
