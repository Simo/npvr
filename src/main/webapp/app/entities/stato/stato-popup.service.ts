import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Stato } from './stato.model';
import { StatoService } from './stato.service';

@Injectable()
export class StatoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private statoService: StatoService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.statoService.find(id)
                    .subscribe((statoResponse: HttpResponse<Stato>) => {
                        const stato: Stato = statoResponse.body;
                        if (stato.validoAl) {
                            stato.validoAl = {
                                year: stato.validoAl.getFullYear(),
                                month: stato.validoAl.getMonth() + 1,
                                day: stato.validoAl.getDate()
                            };
                        }
                        this.ngbModalRef = this.statoModalRef(component, stato);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.statoModalRef(component, new Stato());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    statoModalRef(component: Component, stato: Stato): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.stato = stato;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
