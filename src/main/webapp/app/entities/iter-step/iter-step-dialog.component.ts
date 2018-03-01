import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IterStep } from './iter-step.model';
import { IterStepPopupService } from './iter-step-popup.service';
import { IterStepService } from './iter-step.service';
import { Stato, StatoService } from '../stato';

@Component({
    selector: 'npvr-iter-step-dialog',
    templateUrl: './iter-step-dialog.component.html'
})
export class IterStepDialogComponent implements OnInit {

    iterStep: IterStep;
    isSaving: boolean;

    statoes: Stato[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private iterStepService: IterStepService,
        private statoService: StatoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.statoService.query()
            .subscribe((res: HttpResponse<Stato[]>) => { this.statoes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.iterStep.id !== undefined) {
            this.subscribeToSaveResponse(
                this.iterStepService.update(this.iterStep));
        } else {
            this.subscribeToSaveResponse(
                this.iterStepService.create(this.iterStep));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IterStep>>) {
        result.subscribe((res: HttpResponse<IterStep>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: IterStep) {
        this.eventManager.broadcast({ name: 'iterStepListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackStatoById(index: number, item: Stato) {
        return item.id;
    }
}

@Component({
    selector: 'npvr-iter-step-popup',
    template: ''
})
export class IterStepPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private iterStepPopupService: IterStepPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.iterStepPopupService
                    .open(IterStepDialogComponent as Component, params['id']);
            } else {
                this.iterStepPopupService
                    .open(IterStepDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
