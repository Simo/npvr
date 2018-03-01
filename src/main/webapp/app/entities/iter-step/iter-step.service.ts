import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { IterStep } from './iter-step.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<IterStep>;

@Injectable()
export class IterStepService {

    private resourceUrl =  SERVER_API_URL + 'api/iter-steps';

    constructor(private http: HttpClient) { }

    create(iterStep: IterStep): Observable<EntityResponseType> {
        const copy = this.convert(iterStep);
        return this.http.post<IterStep>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(iterStep: IterStep): Observable<EntityResponseType> {
        const copy = this.convert(iterStep);
        return this.http.put<IterStep>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IterStep>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<IterStep[]>> {
        const options = createRequestOption(req);
        return this.http.get<IterStep[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<IterStep[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IterStep = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<IterStep[]>): HttpResponse<IterStep[]> {
        const jsonResponse: IterStep[] = res.body;
        const body: IterStep[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to IterStep.
     */
    private convertItemFromServer(iterStep: IterStep): IterStep {
        const copy: IterStep = Object.assign({}, iterStep);
        return copy;
    }

    /**
     * Convert a IterStep to a JSON which can be sent to the server.
     */
    private convert(iterStep: IterStep): IterStep {
        const copy: IterStep = Object.assign({}, iterStep);
        return copy;
    }
}
