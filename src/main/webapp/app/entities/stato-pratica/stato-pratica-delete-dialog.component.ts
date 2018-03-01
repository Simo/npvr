import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StatoPratica } from './stato-pratica.model';
import { StatoPraticaPopupService } from './stato-pratica-popup.service';
import { StatoPraticaService } from './stato-pratica.service';

@Component({
    selector: 'npvr-stato-pratica-delete-dialog',
    templateUrl: './stato-pratica-delete-dialog.component.html'
})
export class StatoPraticaDeleteDialogComponent {

    statoPratica: StatoPratica;

    constructor(
        private statoPraticaService: StatoPraticaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.statoPraticaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'statoPraticaListModification',
                content: 'Deleted an statoPratica'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'npvr-stato-pratica-delete-popup',
    template: ''
})
export class StatoPraticaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private statoPraticaPopupService: StatoPraticaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.statoPraticaPopupService
                .open(StatoPraticaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
