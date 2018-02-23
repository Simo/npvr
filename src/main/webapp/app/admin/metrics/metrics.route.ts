import { Route } from '@angular/router';

import { NpvrMetricsMonitoringComponent } from './metrics.component';

export const metricsRoute: Route = {
    path: 'npvr-metrics',
    component: NpvrMetricsMonitoringComponent,
    data: {
        pageTitle: 'Application Metrics'
    }
};
