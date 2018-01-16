import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CarelineAuthService } from 'cl-layout/src/app/shared/service/careline-auth.service';
import { ApiType } from 'cl-layout/src/app/shared/service/base-api.service';
import { SignaturePeopleServerModel, SignaturePad } from 'cl-layout/src/app/shared/tools/cl-signature/signature-pad/signature-pad';
import { SignatureServerModel } from 'cl-layout/src/app/shared/tools/cl-signature/signature-input/signature-input';
import { SignaturePadService } from 'cl-layout/src/app/shared/tools/cl-signature/signature-pad/signature-pad.service';
import { DataServiceService } from '../../services/data-service.service'; 
@Injectable()
export class SignatureService {

    public routingKey = {
        queryParam: {
            orderNumber: 'orderNumber'
        }
    };

    constructor(
        private http:Http,
        private dataService: DataServiceService,
        private carelineAuthService: CarelineAuthService,
        private signaturePadService: SignaturePadService
    ) {
        this.signaturePadService.setConfig({
            uploadToServer: this.upload.bind(this)
        });
    }

    public getList(arg: {
        orderNumber: string
    }): Observable<SignaturePeopleServerModel[]> {

        const source = this.getRealList();

        return source
            .map((signatureInfo: SignatureServerModel) => {
                signatureInfo['info'] = signatureInfo['data'];
                if (!signatureInfo || !signatureInfo.info || !signatureInfo.info.signatureList) {
                    return null;
                }

                const signatureList = signatureInfo.info.signatureList;

                return signatureList;
            });

    }

    upload(postParam: SignaturePad.UploadArguments): void {
        this.dataService.uploadSignature(postParam);
    }

    getRealList() {
        this.dataService.loading = true;  
        let obj =  this.dataService.getSignatureData();
        return obj;
    }
}
