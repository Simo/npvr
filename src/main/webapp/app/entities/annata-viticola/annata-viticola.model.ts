import { BaseEntity } from './../../shared';

export class AnnataViticola implements BaseEntity {
    constructor(
        public id?: number,
        public anno?: string,
        public descrizione?: string,
        public dataInizio?: any,
        public dataFine?: any,
    ) {
    }
}
