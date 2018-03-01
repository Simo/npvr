import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IterStep } from './iter-step.model';
import { IterStepService } from './iter-step.service';
import { Principal } from '../../shared';

@Component({
    selector: 'npvr-iter-step',
    templateUrl: './iter-step.component.html'
})
export class IterStepComponent implements OnInit, OnDestroy {
iterSteps: IterStep[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private iterStepService: IterStepService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.iterStepService.query().subscribe(
            (res: HttpResponse<IterStep[]>) => {
                this.iterSteps = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInIterSteps();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IterStep) {
        return item.id;
    }
    registerChangeInIterSteps() {
        this.eventSubscriber = this.eventManager.subscribe('iterStepListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
