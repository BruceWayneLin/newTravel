import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CarelineAuthService } from 'cl-layout/src/app/shared/service/careline-auth.service';
import { ApiType } from 'cl-layout/src/app/shared/service/base-api.service';
import { SignaturePeopleServerModel, SignaturePad } from 'cl-layout/src/app/shared/tools/cl-signature/signature-pad/signature-pad';
import { SignatureServerModel } from 'cl-layout/src/app/shared/tools/cl-signature/signature-input/signature-input';
import { SignaturePadService } from 'cl-layout/src/app/shared/tools/cl-signature/signature-pad/signature-pad.service';
@Injectable()
export class SignatureService {

    public routingKey = {
        queryParam: {
            orderNumber: 'orderNumber'
        }
    };

    constructor(

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
        // const source = this.carelineAuthService.httpPost<SignatureServerModel>({
        //     apiName: ['MemberFunction', 'getOrderSignatureInfo'],
        //     apiType: ApiType.Travel,
        //     body: {
        //         orderNumber: arg.orderNumber
        //     }
        // });

        const source = this.getFakeList();

        return source
            .map((signatureInfo: SignatureServerModel) => {
                alert('請到 /src/app/components/signature/signature.service.ts 增加你的上傳邏輯');

                if (!signatureInfo || !signatureInfo.info || !signatureInfo.info.signatureList) {
                    return null;
                }

                const signatureList = signatureInfo.info.signatureList;


                return signatureList;
            });

    }

    upload(postParam: SignaturePad.UploadArguments): void {
        // this.carelineAuthService.httpPost({
        //   apiName: ['MemberFunction', 'uploadSignature'],
        //   apiType: ApiType.Travel,
        //   body: postParam
        // })
        // .subscribe();
        alert('請到 /src/app/components/signature/signature.service.ts 增加你的上傳邏輯');
    }

    getFakeList() {
        // 改為正式資料後，請刪除此方法
        return Observable.of({
            'info': {
                'orderNumber': '010101000000925',
                'signatureList':
                    [
                        {
                            'policyId': 5406,
                            'insuredId': 0,
                            'displayName': '邱柏翔',
                            'type': 'APPLICANT',
                            'currentSignatureImageUrl': '',
                            'currentSignatureImageBase30': null,
                            'typeText': '要保人'
                        }, {
                            'policyId': 5406,
                            'insuredId': 6032,
                            'displayName': '邱柏翔',
                            'type': 'INSURED',
                            'currentSignatureImageUrl': '',
                            'currentSignatureImageBase30': null,
                            'typeText': '被保人'
                        }]
                ,
                'allUploaded': false,
                'uploadedCount': 0
            }

        });
    }
}
