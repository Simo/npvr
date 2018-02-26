import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Pratica } from './pratica.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Pratica>;

@Injectable()
export class PraticaService {

    private resourceUrl =  SERVER_API_URL + 'api/praticas';

    constructor(private http: HttpClient) { }

    create(pratica: Pratica): Observable<EntityResponseType> {
        const copy = this.convert(pratica);
        return this.http.post<Pratica>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(pratica: Pratica): Observable<EntityResponseType> {
        const copy = this.convert(pratica);
        return this.http.put<Pratica>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Pratica>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Pratica[]>> {
        const options = createRequestOption(req);
        return this.http.get<Pratica[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Pratica[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Pratica = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Pratica[]>): HttpResponse<Pratica[]> {
        const jsonResponse: Pratica[] = res.body;
        const body: Pratica[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Pratica.
     */
    private convertItemFromServer(pratica: Pratica): Pratica {
        const copy: Pratica = Object.assign({}, pratica);
        return copy;
    }

    /**
     * Convert a Pratica to a JSON which can be sent to the server.
     */
    private convert(pratica: Pratica): Pratica {
        const copy: Pratica = Object.assign({}, pratica);
        return copy;
    }
}
