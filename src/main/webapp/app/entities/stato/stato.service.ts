import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Stato } from './stato.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Stato>;

@Injectable()
export class StatoService {

    private resourceUrl =  SERVER_API_URL + 'api/statoes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(stato: Stato): Observable<EntityResponseType> {
        const copy = this.convert(stato);
        return this.http.post<Stato>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(stato: Stato): Observable<EntityResponseType> {
        const copy = this.convert(stato);
        return this.http.put<Stato>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Stato>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Stato[]>> {
        const options = createRequestOption(req);
        return this.http.get<Stato[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Stato[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Stato = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Stato[]>): HttpResponse<Stato[]> {
        const jsonResponse: Stato[] = res.body;
        const body: Stato[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Stato.
     */
    private convertItemFromServer(stato: Stato): Stato {
        const copy: Stato = Object.assign({}, stato);
        copy.validoAl = this.dateUtils
            .convertLocalDateFromServer(stato.validoAl);
        return copy;
    }

    /**
     * Convert a Stato to a JSON which can be sent to the server.
     */
    private convert(stato: Stato): Stato {
        const copy: Stato = Object.assign({}, stato);
        copy.validoAl = this.dateUtils
            .convertLocalDateToServer(stato.validoAl);
        return copy;
    }
}
