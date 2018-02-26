import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PraticaComponent } from './pratica.component';
import { PraticaDetailComponent } from './pratica-detail.component';
import { PraticaPopupComponent } from './pratica-dialog.component';
import { PraticaDeletePopupComponent } from './pratica-delete-dialog.component';

export const praticaRoute: Routes = [
    {
        path: 'pratica',
        component: PraticaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Praticas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pratica/:id',
        component: PraticaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Praticas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const praticaPopupRoute: Routes = [
    {
        path: 'pratica-new',
        component: PraticaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Praticas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pratica/:id/edit',
        component: PraticaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Praticas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pratica/:id/delete',
        component: PraticaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Praticas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
