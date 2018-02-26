/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { NpvrTestModule } from '../../../test.module';
import { TipoPraticaDetailComponent } from '../../../../../../main/webapp/app/entities/tipo-pratica/tipo-pratica-detail.component';
import { TipoPraticaService } from '../../../../../../main/webapp/app/entities/tipo-pratica/tipo-pratica.service';
import { TipoPratica } from '../../../../../../main/webapp/app/entities/tipo-pratica/tipo-pratica.model';

describe('Component Tests', () => {

    describe('TipoPratica Management Detail Component', () => {
        let comp: TipoPraticaDetailComponent;
        let fixture: ComponentFixture<TipoPraticaDetailComponent>;
        let service: TipoPraticaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NpvrTestModule],
                declarations: [TipoPraticaDetailComponent],
                providers: [
                    TipoPraticaService
                ]
            })
            .overrideTemplate(TipoPraticaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoPraticaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoPraticaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TipoPratica(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tipoPratica).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
