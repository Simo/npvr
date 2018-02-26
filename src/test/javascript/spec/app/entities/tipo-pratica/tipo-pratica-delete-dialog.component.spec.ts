/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { NpvrTestModule } from '../../../test.module';
import { TipoPraticaDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tipo-pratica/tipo-pratica-delete-dialog.component';
import { TipoPraticaService } from '../../../../../../main/webapp/app/entities/tipo-pratica/tipo-pratica.service';

describe('Component Tests', () => {

    describe('TipoPratica Management Delete Component', () => {
        let comp: TipoPraticaDeleteDialogComponent;
        let fixture: ComponentFixture<TipoPraticaDeleteDialogComponent>;
        let service: TipoPraticaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NpvrTestModule],
                declarations: [TipoPraticaDeleteDialogComponent],
                providers: [
                    TipoPraticaService
                ]
            })
            .overrideTemplate(TipoPraticaDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoPraticaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoPraticaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
