import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NpvrAnnataViticolaModule } from './annata-viticola/annata-viticola.module';
import { NpvrTipoPraticaModule } from './tipo-pratica/tipo-pratica.module';
import { NpvrPraticaModule } from './pratica/pratica.module';
import { NpvrStatoModule } from './stato/stato.module';
import { NpvrStatoPraticaModule } from './stato-pratica/stato-pratica.module';
import { NpvrIterStepModule } from './iter-step/iter-step.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NpvrAnnataViticolaModule,
        NpvrTipoPraticaModule,
        NpvrPraticaModule,
        NpvrStatoModule,
        NpvrStatoPraticaModule,
        NpvrIterStepModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NpvrEntityModule {}
