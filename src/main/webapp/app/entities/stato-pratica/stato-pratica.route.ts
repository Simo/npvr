import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { StatoPraticaComponent } from './stato-pratica.component';
import { StatoPraticaDetailComponent } from './stato-pratica-detail.component';
import { StatoPraticaPopupComponent } from './stato-pratica-dialog.component';
import { StatoPraticaDeletePopupComponent } from './stato-pratica-delete-dialog.component';

export const statoPraticaRoute: Routes = [
    {
        path: 'stato-pratica',
        component: StatoPraticaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StatoPraticas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'stato-pratica/:id',
        component: StatoPraticaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StatoPraticas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const statoPraticaPopupRoute: Routes = [
    {
        path: 'stato-pratica-new',
        component: StatoPraticaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StatoPraticas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stato-pratica/:id/edit',
        component: StatoPraticaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StatoPraticas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stato-pratica/:id/delete',
        component: StatoPraticaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StatoPraticas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
