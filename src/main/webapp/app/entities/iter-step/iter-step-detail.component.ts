import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { IterStep } from './iter-step.model';
import { IterStepService } from './iter-step.service';

@Component({
    selector: 'npvr-iter-step-detail',
    templateUrl: './iter-step-detail.component.html'
})
export class IterStepDetailComponent implements OnInit, OnDestroy {

    iterStep: IterStep;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private iterStepService: IterStepService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIterSteps();
    }

    load(id) {
        this.iterStepService.find(id)
            .subscribe((iterStepResponse: HttpResponse<IterStep>) => {
                this.iterStep = iterStepResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInIterSteps() {
        this.eventSubscriber = this.eventManager.subscribe(
            'iterStepListModification',
            (response) => this.load(this.iterStep.id)
        );
    }
}
