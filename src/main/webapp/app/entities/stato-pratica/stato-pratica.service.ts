import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { StatoPratica } from './stato-pratica.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StatoPratica>;

@Injectable()
export class StatoPraticaService {

    private resourceUrl =  SERVER_API_URL + 'api/stato-praticas';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(statoPratica: StatoPratica): Observable<EntityResponseType> {
        const copy = this.convert(statoPratica);
        return this.http.post<StatoPratica>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(statoPratica: StatoPratica): Observable<EntityResponseType> {
        const copy = this.convert(statoPratica);
        return this.http.put<StatoPratica>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<StatoPratica>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StatoPratica[]>> {
        const options = createRequestOption(req);
        return this.http.get<StatoPratica[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StatoPratica[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StatoPratica = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<StatoPratica[]>): HttpResponse<StatoPratica[]> {
        const jsonResponse: StatoPratica[] = res.body;
        const body: StatoPratica[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to StatoPratica.
     */
    private convertItemFromServer(statoPratica: StatoPratica): StatoPratica {
        const copy: StatoPratica = Object.assign({}, statoPratica);
        copy.dataInizio = this.dateUtils
            .convertLocalDateFromServer(statoPratica.dataInizio);
        copy.dataFine = this.dateUtils
            .convertLocalDateFromServer(statoPratica.dataFine);
        return copy;
    }

    /**
     * Convert a StatoPratica to a JSON which can be sent to the server.
     */
    private convert(statoPratica: StatoPratica): StatoPratica {
        const copy: StatoPratica = Object.assign({}, statoPratica);
        copy.dataInizio = this.dateUtils
            .convertLocalDateToServer(statoPratica.dataInizio);
        copy.dataFine = this.dateUtils
            .convertLocalDateToServer(statoPratica.dataFine);
        return copy;
    }
}
