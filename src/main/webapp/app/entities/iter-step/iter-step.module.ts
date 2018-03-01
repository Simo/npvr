import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NpvrSharedModule } from '../../shared';
import {
    IterStepService,
    IterStepPopupService,
    IterStepComponent,
    IterStepDetailComponent,
    IterStepDialogComponent,
    IterStepPopupComponent,
    IterStepDeletePopupComponent,
    IterStepDeleteDialogComponent,
    iterStepRoute,
    iterStepPopupRoute,
} from './';

const ENTITY_STATES = [
    ...iterStepRoute,
    ...iterStepPopupRoute,
];

@NgModule({
    imports: [
        NpvrSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        IterStepComponent,
        IterStepDetailComponent,
        IterStepDialogComponent,
        IterStepDeleteDialogComponent,
        IterStepPopupComponent,
        IterStepDeletePopupComponent,
    ],
    entryComponents: [
        IterStepComponent,
        IterStepDialogComponent,
        IterStepPopupComponent,
        IterStepDeleteDialogComponent,
        IterStepDeletePopupComponent,
    ],
    providers: [
        IterStepService,
        IterStepPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NpvrIterStepModule {}
