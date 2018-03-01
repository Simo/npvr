import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Stato } from './stato.model';
import { StatoPopupService } from './stato-popup.service';
import { StatoService } from './stato.service';

@Component({
    selector: 'npvr-stato-dialog',
    templateUrl: './stato-dialog.component.html'
})
export class StatoDialogComponent implements OnInit {

    stato: Stato;
    isSaving: boolean;
    validoAlDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private statoService: StatoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.stato.id !== undefined) {
            this.subscribeToSaveResponse(
                this.statoService.update(this.stato));
        } else {
            this.subscribeToSaveResponse(
                this.statoService.create(this.stato));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Stato>>) {
        result.subscribe((res: HttpResponse<Stato>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Stato) {
        this.eventManager.broadcast({ name: 'statoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'npvr-stato-popup',
    template: ''
})
export class StatoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private statoPopupService: StatoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.statoPopupService
                    .open(StatoDialogComponent as Component, params['id']);
            } else {
                this.statoPopupService
                    .open(StatoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
