/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { NpvrTestModule } from '../../../test.module';
import { StatoPraticaDetailComponent } from '../../../../../../main/webapp/app/entities/stato-pratica/stato-pratica-detail.component';
import { StatoPraticaService } from '../../../../../../main/webapp/app/entities/stato-pratica/stato-pratica.service';
import { StatoPratica } from '../../../../../../main/webapp/app/entities/stato-pratica/stato-pratica.model';

describe('Component Tests', () => {

    describe('StatoPratica Management Detail Component', () => {
        let comp: StatoPraticaDetailComponent;
        let fixture: ComponentFixture<StatoPraticaDetailComponent>;
        let service: StatoPraticaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NpvrTestModule],
                declarations: [StatoPraticaDetailComponent],
                providers: [
                    StatoPraticaService
                ]
            })
            .overrideTemplate(StatoPraticaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StatoPraticaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StatoPraticaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new StatoPratica(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.statoPratica).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
