import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IterStep } from './iter-step.model';
import { IterStepPopupService } from './iter-step-popup.service';
import { IterStepService } from './iter-step.service';

@Component({
    selector: 'npvr-iter-step-delete-dialog',
    templateUrl: './iter-step-delete-dialog.component.html'
})
export class IterStepDeleteDialogComponent {

    iterStep: IterStep;

    constructor(
        private iterStepService: IterStepService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.iterStepService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'iterStepListModification',
                content: 'Deleted an iterStep'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'npvr-iter-step-delete-popup',
    template: ''
})
export class IterStepDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private iterStepPopupService: IterStepPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.iterStepPopupService
                .open(IterStepDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
