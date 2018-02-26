/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { NpvrTestModule } from '../../../test.module';
import { PraticaDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/pratica/pratica-delete-dialog.component';
import { PraticaService } from '../../../../../../main/webapp/app/entities/pratica/pratica.service';

describe('Component Tests', () => {

    describe('Pratica Management Delete Component', () => {
        let comp: PraticaDeleteDialogComponent;
        let fixture: ComponentFixture<PraticaDeleteDialogComponent>;
        let service: PraticaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NpvrTestModule],
                declarations: [PraticaDeleteDialogComponent],
                providers: [
                    PraticaService
                ]
            })
            .overrideTemplate(PraticaDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PraticaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PraticaService);
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
