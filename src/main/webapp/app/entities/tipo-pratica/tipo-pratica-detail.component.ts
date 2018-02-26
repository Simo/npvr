import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TipoPratica } from './tipo-pratica.model';
import { TipoPraticaService } from './tipo-pratica.service';

@Component({
    selector: 'npvr-tipo-pratica-detail',
    templateUrl: './tipo-pratica-detail.component.html'
})
export class TipoPraticaDetailComponent implements OnInit, OnDestroy {

    tipoPratica: TipoPratica;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipoPraticaService: TipoPraticaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipoPraticas();
    }

    load(id) {
        this.tipoPraticaService.find(id)
            .subscribe((tipoPraticaResponse: HttpResponse<TipoPratica>) => {
                this.tipoPratica = tipoPraticaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipoPraticas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipoPraticaListModification',
            (response) => this.load(this.tipoPratica.id)
        );
    }
}
