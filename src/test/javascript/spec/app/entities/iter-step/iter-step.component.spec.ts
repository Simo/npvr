/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NpvrTestModule } from '../../../test.module';
import { IterStepComponent } from '../../../../../../main/webapp/app/entities/iter-step/iter-step.component';
import { IterStepService } from '../../../../../../main/webapp/app/entities/iter-step/iter-step.service';
import { IterStep } from '../../../../../../main/webapp/app/entities/iter-step/iter-step.model';

describe('Component Tests', () => {

    describe('IterStep Management Component', () => {
        let comp: IterStepComponent;
        let fixture: ComponentFixture<IterStepComponent>;
        let service: IterStepService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NpvrTestModule],
                declarations: [IterStepComponent],
                providers: [
                    IterStepService
                ]
            })
            .overrideTemplate(IterStepComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IterStepComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IterStepService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new IterStep(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.iterSteps[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
