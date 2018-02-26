/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NpvrTestModule } from '../../../test.module';
import { AnnataViticolaComponent } from '../../../../../../main/webapp/app/entities/annata-viticola/annata-viticola.component';
import { AnnataViticolaService } from '../../../../../../main/webapp/app/entities/annata-viticola/annata-viticola.service';
import { AnnataViticola } from '../../../../../../main/webapp/app/entities/annata-viticola/annata-viticola.model';

describe('Component Tests', () => {

    describe('AnnataViticola Management Component', () => {
        let comp: AnnataViticolaComponent;
        let fixture: ComponentFixture<AnnataViticolaComponent>;
        let service: AnnataViticolaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NpvrTestModule],
                declarations: [AnnataViticolaComponent],
                providers: [
                    AnnataViticolaService
                ]
            })
            .overrideTemplate(AnnataViticolaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnnataViticolaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnnataViticolaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AnnataViticola(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.annataViticolas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
