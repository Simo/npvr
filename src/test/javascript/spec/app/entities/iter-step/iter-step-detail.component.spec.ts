/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { NpvrTestModule } from '../../../test.module';
import { IterStepDetailComponent } from '../../../../../../main/webapp/app/entities/iter-step/iter-step-detail.component';
import { IterStepService } from '../../../../../../main/webapp/app/entities/iter-step/iter-step.service';
import { IterStep } from '../../../../../../main/webapp/app/entities/iter-step/iter-step.model';

describe('Component Tests', () => {

    describe('IterStep Management Detail Component', () => {
        let comp: IterStepDetailComponent;
        let fixture: ComponentFixture<IterStepDetailComponent>;
        let service: IterStepService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NpvrTestModule],
                declarations: [IterStepDetailComponent],
                providers: [
                    IterStepService
                ]
            })
            .overrideTemplate(IterStepDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IterStepDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IterStepService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new IterStep(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.iterStep).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
