import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TipoPratica } from './tipo-pratica.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TipoPratica>;

@Injectable()
export class TipoPraticaService {

    private resourceUrl =  SERVER_API_URL + 'api/tipo-praticas';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(tipoPratica: TipoPratica): Observable<EntityResponseType> {
        const copy = this.convert(tipoPratica);
        return this.http.post<TipoPratica>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tipoPratica: TipoPratica): Observable<EntityResponseType> {
        const copy = this.convert(tipoPratica);
        return this.http.put<TipoPratica>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TipoPratica>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TipoPratica[]>> {
        const options = createRequestOption(req);
        return this.http.get<TipoPratica[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TipoPratica[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TipoPratica = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TipoPratica[]>): HttpResponse<TipoPratica[]> {
        const jsonResponse: TipoPratica[] = res.body;
        const body: TipoPratica[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TipoPratica.
     */
    private convertItemFromServer(tipoPratica: TipoPratica): TipoPratica {
        const copy: TipoPratica = Object.assign({}, tipoPratica);
        copy.validoAl = this.dateUtils
            .convertLocalDateFromServer(tipoPratica.validoAl);
        return copy;
    }

    /**
     * Convert a TipoPratica to a JSON which can be sent to the server.
     */
    private convert(tipoPratica: TipoPratica): TipoPratica {
        const copy: TipoPratica = Object.assign({}, tipoPratica);
        copy.validoAl = this.dateUtils
            .convertLocalDateToServer(tipoPratica.validoAl);
        return copy;
    }
}
