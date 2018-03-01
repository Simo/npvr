import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { DataTablesModule } from 'angular-datatables';

import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { NpvrSharedModule, UserRouteAccessService } from './shared';
import { NpvrAppRoutingModule} from './app-routing.module';
import { NpvrHomeModule } from './home/home.module';
import { NpvrAdminModule } from './admin/admin.module';
import { NpvrAccountModule } from './account/account.module';
import { NpvrEntityModule } from './entities/entity.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { StateStorageService } from './shared/auth/state-storage.service';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    NpvrMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';
import { PraticheModule } from './pratiche/pratiche.module';

@NgModule({
    imports: [
        BrowserModule,
        NpvrAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'npvr', separator: '-'}),
        DataTablesModule,
        NpvrSharedModule,
        NpvrHomeModule,
        NpvrAdminModule,
        NpvrAccountModule,
        NpvrEntityModule,
        PraticheModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        NpvrMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                StateStorageService,
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [ NpvrMainComponent ]
})
export class NpvrAppModule {}
