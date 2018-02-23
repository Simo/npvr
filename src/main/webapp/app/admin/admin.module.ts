import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NpvrSharedModule } from '../shared';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

import {
    adminState,
    AuditsComponent,
    UserMgmtComponent,
    UserDialogComponent,
    UserDeleteDialogComponent,
    UserMgmtDetailComponent,
    UserMgmtDialogComponent,
    UserMgmtDeleteDialogComponent,
    LogsComponent,
    NpvrMetricsMonitoringModalComponent,
    NpvrMetricsMonitoringComponent,
    NpvrHealthModalComponent,
    NpvrHealthCheckComponent,
    NpvrConfigurationComponent,
    NpvrDocsComponent,
    AuditsService,
    NpvrConfigurationService,
    NpvrHealthService,
    NpvrMetricsService,
    LogsService,
    UserResolvePagingParams,
    UserResolve,
    UserModalService
} from './';

@NgModule({
    imports: [
        NpvrSharedModule,
        RouterModule.forChild(adminState),
        /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    ],
    declarations: [
        AuditsComponent,
        UserMgmtComponent,
        UserDialogComponent,
        UserDeleteDialogComponent,
        UserMgmtDetailComponent,
        UserMgmtDialogComponent,
        UserMgmtDeleteDialogComponent,
        LogsComponent,
        NpvrConfigurationComponent,
        NpvrHealthCheckComponent,
        NpvrHealthModalComponent,
        NpvrDocsComponent,
        NpvrMetricsMonitoringComponent,
        NpvrMetricsMonitoringModalComponent
    ],
    entryComponents: [
        UserMgmtDialogComponent,
        UserMgmtDeleteDialogComponent,
        NpvrHealthModalComponent,
        NpvrMetricsMonitoringModalComponent,
    ],
    providers: [
        AuditsService,
        NpvrConfigurationService,
        NpvrHealthService,
        NpvrMetricsService,
        LogsService,
        UserResolvePagingParams,
        UserResolve,
        UserModalService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NpvrAdminModule {}
