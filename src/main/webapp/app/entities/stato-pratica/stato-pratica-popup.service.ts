import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { StatoPratica } from './stato-pratica.model';
import { StatoPraticaService } from './stato-pratica.service';

@Injectable()
export class StatoPraticaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private statoPraticaService: StatoPraticaService

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
                this.statoPraticaService.find(id)
                    .subscribe((statoPraticaResponse: HttpResponse<StatoPratica>) => {
                        const statoPratica: StatoPratica = statoPraticaResponse.body;
                        if (statoPratica.dataInizio) {
                            statoPratica.dataInizio = {
                                year: statoPratica.dataInizio.getFullYear(),
                                month: statoPratica.dataInizio.getMonth() + 1,
                                day: statoPratica.dataInizio.getDate()
                            };
                        }
                        if (statoPratica.dataFine) {
                            statoPratica.dataFine = {
                                year: statoPratica.dataFine.getFullYear(),
                                month: statoPratica.dataFine.getMonth() + 1,
                                day: statoPratica.dataFine.getDate()
                            };
                        }
                        this.ngbModalRef = this.statoPraticaModalRef(component, statoPratica);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.statoPraticaModalRef(component, new StatoPratica());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    statoPraticaModalRef(component: Component, statoPratica: StatoPratica): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.statoPratica = statoPratica;
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
