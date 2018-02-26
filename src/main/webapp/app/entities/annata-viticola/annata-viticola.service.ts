import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { AnnataViticola } from './annata-viticola.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AnnataViticola>;

@Injectable()
export class AnnataViticolaService {

    private resourceUrl =  SERVER_API_URL + 'api/annata-viticolas';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(annataViticola: AnnataViticola): Observable<EntityResponseType> {
        const copy = this.convert(annataViticola);
        return this.http.post<AnnataViticola>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(annataViticola: AnnataViticola): Observable<EntityResponseType> {
        const copy = this.convert(annataViticola);
        return this.http.put<AnnataViticola>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AnnataViticola>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AnnataViticola[]>> {
        const options = createRequestOption(req);
        return this.http.get<AnnataViticola[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AnnataViticola[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AnnataViticola = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AnnataViticola[]>): HttpResponse<AnnataViticola[]> {
        const jsonResponse: AnnataViticola[] = res.body;
        const body: AnnataViticola[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AnnataViticola.
     */
    private convertItemFromServer(annataViticola: AnnataViticola): AnnataViticola {
        const copy: AnnataViticola = Object.assign({}, annataViticola);
        copy.dataInizio = this.dateUtils
            .convertLocalDateFromServer(annataViticola.dataInizio);
        copy.dataFine = this.dateUtils
            .convertLocalDateFromServer(annataViticola.dataFine);
        return copy;
    }

    /**
     * Convert a AnnataViticola to a JSON which can be sent to the server.
     */
    private convert(annataViticola: AnnataViticola): AnnataViticola {
        const copy: AnnataViticola = Object.assign({}, annataViticola);
        copy.dataInizio = this.dateUtils
            .convertLocalDateToServer(annataViticola.dataInizio);
        copy.dataFine = this.dateUtils
            .convertLocalDateToServer(annataViticola.dataFine);
        return copy;
    }
}
