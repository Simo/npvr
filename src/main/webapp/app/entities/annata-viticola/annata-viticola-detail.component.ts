import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AnnataViticola } from './annata-viticola.model';
import { AnnataViticolaService } from './annata-viticola.service';

@Component({
    selector: 'npvr-annata-viticola-detail',
    templateUrl: './annata-viticola-detail.component.html'
})
export class AnnataViticolaDetailComponent implements OnInit, OnDestroy {

    annataViticola: AnnataViticola;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private annataViticolaService: AnnataViticolaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAnnataViticolas();
    }

    load(id) {
        this.annataViticolaService.find(id)
            .subscribe((annataViticolaResponse: HttpResponse<AnnataViticola>) => {
                this.annataViticola = annataViticolaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAnnataViticolas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'annataViticolaListModification',
            (response) => this.load(this.annataViticola.id)
        );
    }
}
