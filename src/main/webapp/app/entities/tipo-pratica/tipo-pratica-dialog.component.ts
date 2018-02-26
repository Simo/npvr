import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoPratica } from './tipo-pratica.model';
import { TipoPraticaPopupService } from './tipo-pratica-popup.service';
import { TipoPraticaService } from './tipo-pratica.service';

@Component({
    selector: 'npvr-tipo-pratica-dialog',
    templateUrl: './tipo-pratica-dialog.component.html'
})
export class TipoPraticaDialogComponent implements OnInit {

    tipoPratica: TipoPratica;
    isSaving: boolean;
    validoAlDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private tipoPraticaService: TipoPraticaService,
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
        if (this.tipoPratica.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipoPraticaService.update(this.tipoPratica));
        } else {
            this.subscribeToSaveResponse(
                this.tipoPraticaService.create(this.tipoPratica));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TipoPratica>>) {
        result.subscribe((res: HttpResponse<TipoPratica>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TipoPratica) {
        this.eventManager.broadcast({ name: 'tipoPraticaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'npvr-tipo-pratica-popup',
    template: ''
})
export class TipoPraticaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoPraticaPopupService: TipoPraticaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipoPraticaPopupService
                    .open(TipoPraticaDialogComponent as Component, params['id']);
            } else {
                this.tipoPraticaPopupService
                    .open(TipoPraticaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
