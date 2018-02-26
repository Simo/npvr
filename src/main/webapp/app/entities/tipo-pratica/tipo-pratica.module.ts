import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NpvrSharedModule } from '../../shared';
import {
    TipoPraticaService,
    TipoPraticaPopupService,
    TipoPraticaComponent,
    TipoPraticaDetailComponent,
    TipoPraticaDialogComponent,
    TipoPraticaPopupComponent,
    TipoPraticaDeletePopupComponent,
    TipoPraticaDeleteDialogComponent,
    tipoPraticaRoute,
    tipoPraticaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipoPraticaRoute,
    ...tipoPraticaPopupRoute,
];

@NgModule({
    imports: [
        NpvrSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TipoPraticaComponent,
        TipoPraticaDetailComponent,
        TipoPraticaDialogComponent,
        TipoPraticaDeleteDialogComponent,
        TipoPraticaPopupComponent,
        TipoPraticaDeletePopupComponent,
    ],
    entryComponents: [
        TipoPraticaComponent,
        TipoPraticaDialogComponent,
        TipoPraticaPopupComponent,
        TipoPraticaDeleteDialogComponent,
        TipoPraticaDeletePopupComponent,
    ],
    providers: [
        TipoPraticaService,
        TipoPraticaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NpvrTipoPraticaModule {}
