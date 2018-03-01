import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StatoPratica } from './stato-pratica.model';
import { StatoPraticaPopupService } from './stato-pratica-popup.service';
import { StatoPraticaService } from './stato-pratica.service';
import { Pratica, PraticaService } from '../pratica';
import { Stato, StatoService } from '../stato';

@Component({
    selector: 'npvr-stato-pratica-dialog',
    templateUrl: './stato-pratica-dialog.component.html'
})
export class StatoPraticaDialogComponent implements OnInit {

    statoPratica: StatoPratica;
    isSaving: boolean;

    praticas: Pratica[];

    statoes: Stato[];
    dataInizioDp: any;
    dataFineDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private statoPraticaService: StatoPraticaService,
        private praticaService: PraticaService,
        private statoService: StatoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.praticaService.query()
            .subscribe((res: HttpResponse<Pratica[]>) => { this.praticas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.statoService.query()
            .subscribe((res: HttpResponse<Stato[]>) => { this.statoes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.statoPratica.id !== undefined) {
            this.subscribeToSaveResponse(
                this.statoPraticaService.update(this.statoPratica));
        } else {
            this.subscribeToSaveResponse(
                this.statoPraticaService.create(this.statoPratica));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StatoPratica>>) {
        result.subscribe((res: HttpResponse<StatoPratica>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: StatoPratica) {
        this.eventManager.broadcast({ name: 'statoPraticaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPraticaById(index: number, item: Pratica) {
        return item.id;
    }

    trackStatoById(index: number, item: Stato) {
        return item.id;
    }
}

@Component({
    selector: 'npvr-stato-pratica-popup',
    template: ''
})
export class StatoPraticaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private statoPraticaPopupService: StatoPraticaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.statoPraticaPopupService
                    .open(StatoPraticaDialogComponent as Component, params['id']);
            } else {
                this.statoPraticaPopupService
                    .open(StatoPraticaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
