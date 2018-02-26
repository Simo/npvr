import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AnnataViticola } from './annata-viticola.model';
import { AnnataViticolaPopupService } from './annata-viticola-popup.service';
import { AnnataViticolaService } from './annata-viticola.service';

@Component({
    selector: 'npvr-annata-viticola-delete-dialog',
    templateUrl: './annata-viticola-delete-dialog.component.html'
})
export class AnnataViticolaDeleteDialogComponent {

    annataViticola: AnnataViticola;

    constructor(
        private annataViticolaService: AnnataViticolaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.annataViticolaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'annataViticolaListModification',
                content: 'Deleted an annataViticola'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'npvr-annata-viticola-delete-popup',
    template: ''
})
export class AnnataViticolaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private annataViticolaPopupService: AnnataViticolaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.annataViticolaPopupService
                .open(AnnataViticolaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
