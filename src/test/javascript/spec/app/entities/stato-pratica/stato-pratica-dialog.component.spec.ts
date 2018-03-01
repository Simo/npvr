/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { NpvrTestModule } from '../../../test.module';
import { StatoPraticaDialogComponent } from '../../../../../../main/webapp/app/entities/stato-pratica/stato-pratica-dialog.component';
import { StatoPraticaService } from '../../../../../../main/webapp/app/entities/stato-pratica/stato-pratica.service';
import { StatoPratica } from '../../../../../../main/webapp/app/entities/stato-pratica/stato-pratica.model';
import { PraticaService } from '../../../../../../main/webapp/app/entities/pratica';
import { StatoService } from '../../../../../../main/webapp/app/entities/stato';

describe('Component Tests', () => {

    describe('StatoPratica Management Dialog Component', () => {
        let comp: StatoPraticaDialogComponent;
        let fixture: ComponentFixture<StatoPraticaDialogComponent>;
        let service: StatoPraticaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NpvrTestModule],
                declarations: [StatoPraticaDialogComponent],
                providers: [
                    PraticaService,
                    StatoService,
                    StatoPraticaService
                ]
            })
            .overrideTemplate(StatoPraticaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StatoPraticaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StatoPraticaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StatoPratica(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.statoPratica = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'statoPraticaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StatoPratica();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.statoPratica = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'statoPraticaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
