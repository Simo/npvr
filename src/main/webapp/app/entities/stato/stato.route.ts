import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { StatoComponent } from './stato.component';
import { StatoDetailComponent } from './stato-detail.component';
import { StatoPopupComponent } from './stato-dialog.component';
import { StatoDeletePopupComponent } from './stato-delete-dialog.component';

export const statoRoute: Routes = [
    {
        path: 'stato',
        component: StatoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Statoes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'stato/:id',
        component: StatoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Statoes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const statoPopupRoute: Routes = [
    {
        path: 'stato-new',
        component: StatoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Statoes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stato/:id/edit',
        component: StatoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Statoes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stato/:id/delete',
        component: StatoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Statoes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
