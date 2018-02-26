/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { NpvrTestModule } from '../../../test.module';
import { PraticaDetailComponent } from '../../../../../../main/webapp/app/entities/pratica/pratica-detail.component';
import { PraticaService } from '../../../../../../main/webapp/app/entities/pratica/pratica.service';
import { Pratica } from '../../../../../../main/webapp/app/entities/pratica/pratica.model';

describe('Component Tests', () => {

    describe('Pratica Management Detail Component', () => {
        let comp: PraticaDetailComponent;
        let fixture: ComponentFixture<PraticaDetailComponent>;
        let service: PraticaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NpvrTestModule],
                declarations: [PraticaDetailComponent],
                providers: [
                    PraticaService
                ]
            })
            .overrideTemplate(PraticaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PraticaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PraticaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Pratica(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.pratica).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
