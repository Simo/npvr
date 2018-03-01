import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StatoPratica } from './stato-pratica.model';
import { StatoPraticaService } from './stato-pratica.service';
import { Principal } from '../../shared';

@Component({
    selector: 'npvr-stato-pratica',
    templateUrl: './stato-pratica.component.html'
})
export class StatoPraticaComponent implements OnInit, OnDestroy {
statoPraticas: StatoPratica[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private statoPraticaService: StatoPraticaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.statoPraticaService.query().subscribe(
            (res: HttpResponse<StatoPratica[]>) => {
                this.statoPraticas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInStatoPraticas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: StatoPratica) {
        return item.id;
    }
    registerChangeInStatoPraticas() {
        this.eventSubscriber = this.eventManager.subscribe('statoPraticaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
