import { BaseEntity } from './../../shared';

export class Pratica implements BaseEntity {
    constructor(
        public id?: number,
        public numeroPratica?: string,
        public nome?: string,
        public annataViticolaId?: number,
        public tipoPraticaId?: number,
    ) {
    }
}
