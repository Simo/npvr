import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoPratica } from './tipo-pratica.model';
import { TipoPraticaPopupService } from './tipo-pratica-popup.service';
import { TipoPraticaService } from './tipo-pratica.service';

@Component({
    selector: 'npvr-tipo-pratica-delete-dialog',
    templateUrl: './tipo-pratica-delete-dialog.component.html'
})
export class TipoPraticaDeleteDialogComponent {

    tipoPratica: TipoPratica;

    constructor(
        private tipoPraticaService: TipoPraticaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoPraticaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipoPraticaListModification',
                content: 'Deleted an tipoPratica'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'npvr-tipo-pratica-delete-popup',
    template: ''
})
export class TipoPraticaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoPraticaPopupService: TipoPraticaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipoPraticaPopupService
                .open(TipoPraticaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
