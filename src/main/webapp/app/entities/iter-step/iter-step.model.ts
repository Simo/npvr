import { BaseEntity } from './../../shared';

export class IterStep implements BaseEntity {
    constructor(
        public id?: number,
        public definizione?: string,
        public descrizione?: string,
        public direzione?: number,
        public statoPartenza?: BaseEntity,
        public statoArrivo?: BaseEntity,
    ) {
    }
}
