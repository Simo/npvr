import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TipoPratica } from './tipo-pratica.model';
import { TipoPraticaService } from './tipo-pratica.service';

@Injectable()
export class TipoPraticaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private tipoPraticaService: TipoPraticaService

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
                this.tipoPraticaService.find(id)
                    .subscribe((tipoPraticaResponse: HttpResponse<TipoPratica>) => {
                        const tipoPratica: TipoPratica = tipoPraticaResponse.body;
                        if (tipoPratica.validoAl) {
                            tipoPratica.validoAl = {
                                year: tipoPratica.validoAl.getFullYear(),
                                month: tipoPratica.validoAl.getMonth() + 1,
                                day: tipoPratica.validoAl.getDate()
                            };
                        }
                        this.ngbModalRef = this.tipoPraticaModalRef(component, tipoPratica);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipoPraticaModalRef(component, new TipoPratica());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipoPraticaModalRef(component: Component, tipoPratica: TipoPratica): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tipoPratica = tipoPratica;
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
