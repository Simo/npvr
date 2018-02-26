import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Pratica } from './pratica.model';
import { PraticaPopupService } from './pratica-popup.service';
import { PraticaService } from './pratica.service';

@Component({
    selector: 'npvr-pratica-delete-dialog',
    templateUrl: './pratica-delete-dialog.component.html'
})
export class PraticaDeleteDialogComponent {

    pratica: Pratica;

    constructor(
        private praticaService: PraticaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.praticaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'praticaListModification',
                content: 'Deleted an pratica'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'npvr-pratica-delete-popup',
    template: ''
})
export class PraticaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private praticaPopupService: PraticaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.praticaPopupService
                .open(PraticaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
