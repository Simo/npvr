/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { NpvrTestModule } from '../../../test.module';
import { AnnataViticolaDialogComponent } from '../../../../../../main/webapp/app/entities/annata-viticola/annata-viticola-dialog.component';
import { AnnataViticolaService } from '../../../../../../main/webapp/app/entities/annata-viticola/annata-viticola.service';
import { AnnataViticola } from '../../../../../../main/webapp/app/entities/annata-viticola/annata-viticola.model';

describe('Component Tests', () => {

    describe('AnnataViticola Management Dialog Component', () => {
        let comp: AnnataViticolaDialogComponent;
        let fixture: ComponentFixture<AnnataViticolaDialogComponent>;
        let service: AnnataViticolaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NpvrTestModule],
                declarations: [AnnataViticolaDialogComponent],
                providers: [
                    AnnataViticolaService
                ]
            })
            .overrideTemplate(AnnataViticolaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnnataViticolaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnnataViticolaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AnnataViticola(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.annataViticola = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'annataViticolaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AnnataViticola();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.annataViticola = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'annataViticolaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
