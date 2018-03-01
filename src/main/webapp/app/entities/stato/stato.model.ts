import { BaseEntity } from './../../shared';

export class Stato implements BaseEntity {
    constructor(
        public id?: number,
        public definizione?: string,
        public descrizione?: string,
        public acronimo?: string,
        public codice?: string,
        public validoAl?: any,
    ) {
    }
}
