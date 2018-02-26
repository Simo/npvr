import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TipoPratica } from './tipo-pratica.model';
import { TipoPraticaService } from './tipo-pratica.service';
import { Principal } from '../../shared';

@Component({
    selector: 'npvr-tipo-pratica',
    templateUrl: './tipo-pratica.component.html'
})
export class TipoPraticaComponent implements OnInit, OnDestroy {
tipoPraticas: TipoPratica[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tipoPraticaService: TipoPraticaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tipoPraticaService.query().subscribe(
            (res: HttpResponse<TipoPratica[]>) => {
                this.tipoPraticas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTipoPraticas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TipoPratica) {
        return item.id;
    }
    registerChangeInTipoPraticas() {
        this.eventSubscriber = this.eventManager.subscribe('tipoPraticaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
