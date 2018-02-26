import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AnnataViticola } from './annata-viticola.model';
import { AnnataViticolaService } from './annata-viticola.service';

@Injectable()
export class AnnataViticolaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private annataViticolaService: AnnataViticolaService

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
                this.annataViticolaService.find(id)
                    .subscribe((annataViticolaResponse: HttpResponse<AnnataViticola>) => {
                        const annataViticola: AnnataViticola = annataViticolaResponse.body;
                        if (annataViticola.dataInizio) {
                            annataViticola.dataInizio = {
                                year: annataViticola.dataInizio.getFullYear(),
                                month: annataViticola.dataInizio.getMonth() + 1,
                                day: annataViticola.dataInizio.getDate()
                            };
                        }
                        if (annataViticola.dataFine) {
                            annataViticola.dataFine = {
                                year: annataViticola.dataFine.getFullYear(),
                                month: annataViticola.dataFine.getMonth() + 1,
                                day: annataViticola.dataFine.getDate()
                            };
                        }
                        this.ngbModalRef = this.annataViticolaModalRef(component, annataViticola);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.annataViticolaModalRef(component, new AnnataViticola());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    annataViticolaModalRef(component: Component, annataViticola: AnnataViticola): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.annataViticola = annataViticola;
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
