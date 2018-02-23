import { Route } from '@angular/router';

import { NpvrHealthCheckComponent } from './health.component';

export const healthRoute: Route = {
    path: 'npvr-health',
    component: NpvrHealthCheckComponent,
    data: {
        pageTitle: 'Health Checks'
    }
};
