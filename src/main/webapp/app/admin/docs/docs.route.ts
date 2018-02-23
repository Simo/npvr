import { Route } from '@angular/router';

import { NpvrDocsComponent } from './docs.component';

export const docsRoute: Route = {
    path: 'docs',
    component: NpvrDocsComponent,
    data: {
        pageTitle: 'API'
    }
};
