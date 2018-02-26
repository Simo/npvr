import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TipoPraticaComponent } from './tipo-pratica.component';
import { TipoPraticaDetailComponent } from './tipo-pratica-detail.component';
import { TipoPraticaPopupComponent } from './tipo-pratica-dialog.component';
import { TipoPraticaDeletePopupComponent } from './tipo-pratica-delete-dialog.component';

export const tipoPraticaRoute: Routes = [
    {
        path: 'tipo-pratica',
        component: TipoPraticaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoPraticas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipo-pratica/:id',
        component: TipoPraticaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoPraticas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoPraticaPopupRoute: Routes = [
    {
        path: 'tipo-pratica-new',
        component: TipoPraticaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoPraticas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-pratica/:id/edit',
        component: TipoPraticaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoPraticas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-pratica/:id/delete',
        component: TipoPraticaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoPraticas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
