import { Route } from '@angular/router';

import { NpvrConfigurationComponent } from './configuration.component';

export const configurationRoute: Route = {
    path: 'npvr-configuration',
    component: NpvrConfigurationComponent,
    data: {
        pageTitle: 'Configuration'
    }
};
