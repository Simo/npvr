/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NpvrTestModule } from '../../../test.module';
import { TipoPraticaComponent } from '../../../../../../main/webapp/app/entities/tipo-pratica/tipo-pratica.component';
import { TipoPraticaService } from '../../../../../../main/webapp/app/entities/tipo-pratica/tipo-pratica.service';
import { TipoPratica } from '../../../../../../main/webapp/app/entities/tipo-pratica/tipo-pratica.model';

describe('Component Tests', () => {

    describe('TipoPratica Management Component', () => {
        let comp: TipoPraticaComponent;
        let fixture: ComponentFixture<TipoPraticaComponent>;
        let service: TipoPraticaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NpvrTestModule],
                declarations: [TipoPraticaComponent],
                providers: [
                    TipoPraticaService
                ]
            })
            .overrideTemplate(TipoPraticaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoPraticaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoPraticaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TipoPratica(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tipoPraticas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
