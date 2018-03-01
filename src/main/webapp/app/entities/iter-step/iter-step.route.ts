import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { IterStepComponent } from './iter-step.component';
import { IterStepDetailComponent } from './iter-step-detail.component';
import { IterStepPopupComponent } from './iter-step-dialog.component';
import { IterStepDeletePopupComponent } from './iter-step-delete-dialog.component';

export const iterStepRoute: Routes = [
    {
        path: 'iter-step',
        component: IterStepComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IterSteps'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'iter-step/:id',
        component: IterStepDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IterSteps'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const iterStepPopupRoute: Routes = [
    {
        path: 'iter-step-new',
        component: IterStepPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IterSteps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'iter-step/:id/edit',
        component: IterStepPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IterSteps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'iter-step/:id/delete',
        component: IterStepDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IterSteps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
