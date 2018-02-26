import { BaseEntity } from './../../shared';

export class TipoPratica implements BaseEntity {
    constructor(
        public id?: number,
        public descrizione?: string,
        public acronimo?: string,
        public famiglia?: string,
        public validoAl?: any,
    ) {
    }
}
