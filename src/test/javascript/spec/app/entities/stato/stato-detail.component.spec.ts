/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { NpvrTestModule } from '../../../test.module';
import { StatoDetailComponent } from '../../../../../../main/webapp/app/entities/stato/stato-detail.component';
import { StatoService } from '../../../../../../main/webapp/app/entities/stato/stato.service';
import { Stato } from '../../../../../../main/webapp/app/entities/stato/stato.model';

describe('Component Tests', () => {

    describe('Stato Management Detail Component', () => {
        let comp: StatoDetailComponent;
        let fixture: ComponentFixture<StatoDetailComponent>;
        let service: StatoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NpvrTestModule],
                declarations: [StatoDetailComponent],
                providers: [
                    StatoService
                ]
            })
            .overrideTemplate(StatoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StatoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StatoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Stato(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.stato).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
