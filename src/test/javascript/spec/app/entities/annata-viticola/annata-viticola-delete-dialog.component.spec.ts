/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { NpvrTestModule } from '../../../test.module';
import { AnnataViticolaDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/annata-viticola/annata-viticola-delete-dialog.component';
import { AnnataViticolaService } from '../../../../../../main/webapp/app/entities/annata-viticola/annata-viticola.service';

describe('Component Tests', () => {

    describe('AnnataViticola Management Delete Component', () => {
        let comp: AnnataViticolaDeleteDialogComponent;
        let fixture: ComponentFixture<AnnataViticolaDeleteDialogComponent>;
        let service: AnnataViticolaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NpvrTestModule],
                declarations: [AnnataViticolaDeleteDialogComponent],
                providers: [
                    AnnataViticolaService
                ]
            })
            .overrideTemplate(AnnataViticolaDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnnataViticolaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnnataViticolaService);
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
