import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NpvrSharedModule } from '../../shared';
import {
    AnnataViticolaService,
    AnnataViticolaPopupService,
    AnnataViticolaComponent,
    AnnataViticolaDetailComponent,
    AnnataViticolaDialogComponent,
    AnnataViticolaPopupComponent,
    AnnataViticolaDeletePopupComponent,
    AnnataViticolaDeleteDialogComponent,
    annataViticolaRoute,
    annataViticolaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...annataViticolaRoute,
    ...annataViticolaPopupRoute,
];

@NgModule({
    imports: [
        NpvrSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AnnataViticolaComponent,
        AnnataViticolaDetailComponent,
        AnnataViticolaDialogComponent,
        AnnataViticolaDeleteDialogComponent,
        AnnataViticolaPopupComponent,
        AnnataViticolaDeletePopupComponent,
    ],
    entryComponents: [
        AnnataViticolaComponent,
        AnnataViticolaDialogComponent,
        AnnataViticolaPopupComponent,
        AnnataViticolaDeleteDialogComponent,
        AnnataViticolaDeletePopupComponent,
    ],
    providers: [
        AnnataViticolaService,
        AnnataViticolaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NpvrAnnataViticolaModule {}
