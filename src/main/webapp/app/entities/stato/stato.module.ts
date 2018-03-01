import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NpvrSharedModule } from '../../shared';
import {
    StatoService,
    StatoPopupService,
    StatoComponent,
    StatoDetailComponent,
    StatoDialogComponent,
    StatoPopupComponent,
    StatoDeletePopupComponent,
    StatoDeleteDialogComponent,
    statoRoute,
    statoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...statoRoute,
    ...statoPopupRoute,
];

@NgModule({
    imports: [
        NpvrSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StatoComponent,
        StatoDetailComponent,
        StatoDialogComponent,
        StatoDeleteDialogComponent,
        StatoPopupComponent,
        StatoDeletePopupComponent,
    ],
    entryComponents: [
        StatoComponent,
        StatoDialogComponent,
        StatoPopupComponent,
        StatoDeleteDialogComponent,
        StatoDeletePopupComponent,
    ],
    providers: [
        StatoService,
        StatoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NpvrStatoModule {}
