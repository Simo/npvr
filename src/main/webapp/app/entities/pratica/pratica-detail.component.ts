import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Pratica } from './pratica.model';
import { PraticaService } from './pratica.service';

@Component({
    selector: 'npvr-pratica-detail',
    templateUrl: './pratica-detail.component.html'
})
export class PraticaDetailComponent implements OnInit, OnDestroy {

    pratica: Pratica;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private praticaService: PraticaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPraticas();
    }

    load(id) {
        this.praticaService.find(id)
            .subscribe((praticaResponse: HttpResponse<Pratica>) => {
                this.pratica = praticaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPraticas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'praticaListModification',
            (response) => this.load(this.pratica.id)
        );
    }
}
