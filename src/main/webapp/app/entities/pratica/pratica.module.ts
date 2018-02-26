import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NpvrSharedModule } from '../../shared';
import {
    PraticaService,
    PraticaPopupService,
    PraticaComponent,
    PraticaDetailComponent,
    PraticaDialogComponent,
    PraticaPopupComponent,
    PraticaDeletePopupComponent,
    PraticaDeleteDialogComponent,
    praticaRoute,
    praticaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...praticaRoute,
    ...praticaPopupRoute,
];

@NgModule({
    imports: [
        NpvrSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PraticaComponent,
        PraticaDetailComponent,
        PraticaDialogComponent,
        PraticaDeleteDialogComponent,
        PraticaPopupComponent,
        PraticaDeletePopupComponent,
    ],
    entryComponents: [
        PraticaComponent,
        PraticaDialogComponent,
        PraticaPopupComponent,
        PraticaDeleteDialogComponent,
        PraticaDeletePopupComponent,
    ],
    providers: [
        PraticaService,
        PraticaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NpvrPraticaModule {}
