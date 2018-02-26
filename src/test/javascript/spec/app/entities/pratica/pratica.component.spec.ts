/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NpvrTestModule } from '../../../test.module';
import { PraticaComponent } from '../../../../../../main/webapp/app/entities/pratica/pratica.component';
import { PraticaService } from '../../../../../../main/webapp/app/entities/pratica/pratica.service';
import { Pratica } from '../../../../../../main/webapp/app/entities/pratica/pratica.model';

describe('Component Tests', () => {

    describe('Pratica Management Component', () => {
        let comp: PraticaComponent;
        let fixture: ComponentFixture<PraticaComponent>;
        let service: PraticaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NpvrTestModule],
                declarations: [PraticaComponent],
                providers: [
                    PraticaService
                ]
            })
            .overrideTemplate(PraticaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PraticaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PraticaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Pratica(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.praticas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
