import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Pratica } from './pratica.model';
import { PraticaPopupService } from './pratica-popup.service';
import { PraticaService } from './pratica.service';
import { AnnataViticola, AnnataViticolaService } from '../annata-viticola';
import { TipoPratica, TipoPraticaService } from '../tipo-pratica';

@Component({
    selector: 'npvr-pratica-dialog',
    templateUrl: './pratica-dialog.component.html'
})
export class PraticaDialogComponent implements OnInit {

    pratica: Pratica;
    isSaving: boolean;

    annataviticolas: AnnataViticola[];

    tipopraticas: TipoPratica[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private praticaService: PraticaService,
        private annataViticolaService: AnnataViticolaService,
        private tipoPraticaService: TipoPraticaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.annataViticolaService.query()
            .subscribe((res: HttpResponse<AnnataViticola[]>) => { this.annataviticolas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tipoPraticaService.query()
            .subscribe((res: HttpResponse<TipoPratica[]>) => { this.tipopraticas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pratica.id !== undefined) {
            this.subscribeToSaveResponse(
                this.praticaService.update(this.pratica));
        } else {
            this.subscribeToSaveResponse(
                this.praticaService.create(this.pratica));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Pratica>>) {
        result.subscribe((res: HttpResponse<Pratica>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Pratica) {
        this.eventManager.broadcast({ name: 'praticaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAnnataViticolaById(index: number, item: AnnataViticola) {
        return item.id;
    }

    trackTipoPraticaById(index: number, item: TipoPratica) {
        return item.id;
    }
}

@Component({
    selector: 'npvr-pratica-popup',
    template: ''
})
export class PraticaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private praticaPopupService: PraticaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.praticaPopupService
                    .open(PraticaDialogComponent as Component, params['id']);
            } else {
                this.praticaPopupService
                    .open(PraticaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
