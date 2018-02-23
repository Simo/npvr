import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en';

import {
    NpvrSharedLibsModule,
    NpvrAlertComponent,
    NpvrAlertErrorComponent
} from './';

@NgModule({
    imports: [
        NpvrSharedLibsModule
    ],
    declarations: [
        NpvrAlertComponent,
        NpvrAlertErrorComponent
    ],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
    ],
    exports: [
        NpvrSharedLibsModule,
        NpvrAlertComponent,
        NpvrAlertErrorComponent
    ]
})
export class NpvrSharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
