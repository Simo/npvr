/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NpvrTestModule } from '../../../test.module';
import { StatoComponent } from '../../../../../../main/webapp/app/entities/stato/stato.component';
import { StatoService } from '../../../../../../main/webapp/app/entities/stato/stato.service';
import { Stato } from '../../../../../../main/webapp/app/entities/stato/stato.model';

describe('Component Tests', () => {

    describe('Stato Management Component', () => {
        let comp: StatoComponent;
        let fixture: ComponentFixture<StatoComponent>;
        let service: StatoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NpvrTestModule],
                declarations: [StatoComponent],
                providers: [
                    StatoService
                ]
            })
            .overrideTemplate(StatoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StatoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StatoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Stato(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.statoes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
