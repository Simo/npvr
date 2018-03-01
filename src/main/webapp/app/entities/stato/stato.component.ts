import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Stato } from './stato.model';
import { StatoService } from './stato.service';
import { Principal } from '../../shared';

@Component({
    selector: 'npvr-stato',
    templateUrl: './stato.component.html'
})
export class StatoComponent implements OnInit, OnDestroy {
statoes: Stato[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private statoService: StatoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.statoService.query().subscribe(
            (res: HttpResponse<Stato[]>) => {
                this.statoes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInStatoes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Stato) {
        return item.id;
    }
    registerChangeInStatoes() {
        this.eventSubscriber = this.eventManager.subscribe('statoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
