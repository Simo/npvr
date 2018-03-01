import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Stato } from './stato.model';
import { StatoService } from './stato.service';

@Component({
    selector: 'npvr-stato-detail',
    templateUrl: './stato-detail.component.html'
})
export class StatoDetailComponent implements OnInit, OnDestroy {

    stato: Stato;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private statoService: StatoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStatoes();
    }

    load(id) {
        this.statoService.find(id)
            .subscribe((statoResponse: HttpResponse<Stato>) => {
                this.stato = statoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStatoes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'statoListModification',
            (response) => this.load(this.stato.id)
        );
    }
}
