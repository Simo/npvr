import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Stato } from './stato.model';
import { StatoPopupService } from './stato-popup.service';
import { StatoService } from './stato.service';

@Component({
    selector: 'npvr-stato-delete-dialog',
    templateUrl: './stato-delete-dialog.component.html'
})
export class StatoDeleteDialogComponent {

    stato: Stato;

    constructor(
        private statoService: StatoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.statoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'statoListModification',
                content: 'Deleted an stato'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'npvr-stato-delete-popup',
    template: ''
})
export class StatoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private statoPopupService: StatoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.statoPopupService
                .open(StatoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
