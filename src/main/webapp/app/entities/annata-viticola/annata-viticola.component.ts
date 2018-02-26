import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AnnataViticola } from './annata-viticola.model';
import { AnnataViticolaService } from './annata-viticola.service';
import { Principal } from '../../shared';

@Component({
    selector: 'npvr-annata-viticola',
    templateUrl: './annata-viticola.component.html'
})
export class AnnataViticolaComponent implements OnInit, OnDestroy {
annataViticolas: AnnataViticola[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private annataViticolaService: AnnataViticolaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.annataViticolaService.query().subscribe(
            (res: HttpResponse<AnnataViticola[]>) => {
                this.annataViticolas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAnnataViticolas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AnnataViticola) {
        return item.id;
    }
    registerChangeInAnnataViticolas() {
        this.eventSubscriber = this.eventManager.subscribe('annataViticolaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
