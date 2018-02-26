/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { NpvrTestModule } from '../../../test.module';
import { AnnataViticolaDetailComponent } from '../../../../../../main/webapp/app/entities/annata-viticola/annata-viticola-detail.component';
import { AnnataViticolaService } from '../../../../../../main/webapp/app/entities/annata-viticola/annata-viticola.service';
import { AnnataViticola } from '../../../../../../main/webapp/app/entities/annata-viticola/annata-viticola.model';

describe('Component Tests', () => {

    describe('AnnataViticola Management Detail Component', () => {
        let comp: AnnataViticolaDetailComponent;
        let fixture: ComponentFixture<AnnataViticolaDetailComponent>;
        let service: AnnataViticolaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NpvrTestModule],
                declarations: [AnnataViticolaDetailComponent],
                providers: [
                    AnnataViticolaService
                ]
            })
            .overrideTemplate(AnnataViticolaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnnataViticolaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnnataViticolaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AnnataViticola(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.annataViticola).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
