import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AnnataViticola } from './annata-viticola.model';
import { AnnataViticolaPopupService } from './annata-viticola-popup.service';
import { AnnataViticolaService } from './annata-viticola.service';

@Component({
    selector: 'npvr-annata-viticola-dialog',
    templateUrl: './annata-viticola-dialog.component.html'
})
export class AnnataViticolaDialogComponent implements OnInit {

    annataViticola: AnnataViticola;
    isSaving: boolean;
    dataInizioDp: any;
    dataFineDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private annataViticolaService: AnnataViticolaService,
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
        if (this.annataViticola.id !== undefined) {
            this.subscribeToSaveResponse(
                this.annataViticolaService.update(this.annataViticola));
        } else {
            this.subscribeToSaveResponse(
                this.annataViticolaService.create(this.annataViticola));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AnnataViticola>>) {
        result.subscribe((res: HttpResponse<AnnataViticola>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AnnataViticola) {
        this.eventManager.broadcast({ name: 'annataViticolaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'npvr-annata-viticola-popup',
    template: ''
})
export class AnnataViticolaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private annataViticolaPopupService: AnnataViticolaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.annataViticolaPopupService
                    .open(AnnataViticolaDialogComponent as Component, params['id']);
            } else {
                this.annataViticolaPopupService
                    .open(AnnataViticolaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
