import { BaseEntity } from './../../shared';

export class StatoPratica implements BaseEntity {
    constructor(
        public id?: number,
        public dataInizio?: any,
        public dataFine?: any,
        public utente?: number,
        public praticaId?: number,
        public statoId?: number,
    ) {
    }
}
