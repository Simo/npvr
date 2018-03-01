import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StatoPratica } from './stato-pratica.model';
import { StatoPraticaService } from './stato-pratica.service';

@Component({
    selector: 'npvr-stato-pratica-detail',
    templateUrl: './stato-pratica-detail.component.html'
})
export class StatoPraticaDetailComponent implements OnInit, OnDestroy {

    statoPratica: StatoPratica;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private statoPraticaService: StatoPraticaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStatoPraticas();
    }

    load(id) {
        this.statoPraticaService.find(id)
            .subscribe((statoPraticaResponse: HttpResponse<StatoPratica>) => {
                this.statoPratica = statoPraticaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStatoPraticas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'statoPraticaListModification',
            (response) => this.load(this.statoPratica.id)
        );
    }
}
