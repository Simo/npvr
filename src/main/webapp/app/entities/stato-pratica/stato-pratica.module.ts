import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NpvrSharedModule } from '../../shared';
import {
    StatoPraticaService,
    StatoPraticaPopupService,
    StatoPraticaComponent,
    StatoPraticaDetailComponent,
    StatoPraticaDialogComponent,
    StatoPraticaPopupComponent,
    StatoPraticaDeletePopupComponent,
    StatoPraticaDeleteDialogComponent,
    statoPraticaRoute,
    statoPraticaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...statoPraticaRoute,
    ...statoPraticaPopupRoute,
];

@NgModule({
    imports: [
        NpvrSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StatoPraticaComponent,
        StatoPraticaDetailComponent,
        StatoPraticaDialogComponent,
        StatoPraticaDeleteDialogComponent,
        StatoPraticaPopupComponent,
        StatoPraticaDeletePopupComponent,
    ],
    entryComponents: [
        StatoPraticaComponent,
        StatoPraticaDialogComponent,
        StatoPraticaPopupComponent,
        StatoPraticaDeleteDialogComponent,
        StatoPraticaDeletePopupComponent,
    ],
    providers: [
        StatoPraticaService,
        StatoPraticaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NpvrStatoPraticaModule {}
