/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NpvrTestModule } from '../../../test.module';
import { StatoPraticaComponent } from '../../../../../../main/webapp/app/entities/stato-pratica/stato-pratica.component';
import { StatoPraticaService } from '../../../../../../main/webapp/app/entities/stato-pratica/stato-pratica.service';
import { StatoPratica } from '../../../../../../main/webapp/app/entities/stato-pratica/stato-pratica.model';

describe('Component Tests', () => {

    describe('StatoPratica Management Component', () => {
        let comp: StatoPraticaComponent;
        let fixture: ComponentFixture<StatoPraticaComponent>;
        let service: StatoPraticaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NpvrTestModule],
                declarations: [StatoPraticaComponent],
                providers: [
                    StatoPraticaService
                ]
            })
            .overrideTemplate(StatoPraticaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StatoPraticaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StatoPraticaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new StatoPratica(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.statoPraticas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
