import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Pratica } from './pratica.model';
import { PraticaService } from './pratica.service';
import { Principal } from '../../shared';

@Component({
    selector: 'npvr-pratica',
    templateUrl: './pratica.component.html'
})
export class PraticaComponent implements OnInit, OnDestroy {
praticas: Pratica[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private praticaService: PraticaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.praticaService.query().subscribe(
            (res: HttpResponse<Pratica[]>) => {
                this.praticas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPraticas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Pratica) {
        return item.id;
    }
    registerChangeInPraticas() {
        this.eventSubscriber = this.eventManager.subscribe('praticaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
