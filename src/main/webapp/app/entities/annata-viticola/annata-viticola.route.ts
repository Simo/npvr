import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AnnataViticolaComponent } from './annata-viticola.component';
import { AnnataViticolaDetailComponent } from './annata-viticola-detail.component';
import { AnnataViticolaPopupComponent } from './annata-viticola-dialog.component';
import { AnnataViticolaDeletePopupComponent } from './annata-viticola-delete-dialog.component';

export const annataViticolaRoute: Routes = [
    {
        path: 'annata-viticola',
        component: AnnataViticolaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AnnataViticolas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'annata-viticola/:id',
        component: AnnataViticolaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AnnataViticolas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const annataViticolaPopupRoute: Routes = [
    {
        path: 'annata-viticola-new',
        component: AnnataViticolaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AnnataViticolas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'annata-viticola/:id/edit',
        component: AnnataViticolaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AnnataViticolas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'annata-viticola/:id/delete',
        component: AnnataViticolaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AnnataViticolas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
