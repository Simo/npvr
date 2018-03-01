package it.insiel.siagri.npvr.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A StatoPratica.
 */
@Entity
@Table(name = "npvr_stato_prt")
public class StatoPratica implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "data_inizio")
    private LocalDate dataInizio;

    @Column(name = "data_fine")
    private LocalDate dataFine;

    @Column(name = "utente")
    private Long utente;

    @ManyToOne
    private Pratica pratica;

    @ManyToOne
    private Stato stato;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataInizio() {
        return dataInizio;
    }

    public StatoPratica dataInizio(LocalDate dataInizio) {
        this.dataInizio = dataInizio;
        return this;
    }

    public void setDataInizio(LocalDate dataInizio) {
        this.dataInizio = dataInizio;
    }

    public LocalDate getDataFine() {
        return dataFine;
    }

    public StatoPratica dataFine(LocalDate dataFine) {
        this.dataFine = dataFine;
        return this;
    }

    public void setDataFine(LocalDate dataFine) {
        this.dataFine = dataFine;
    }

    public Long getUtente() {
        return utente;
    }

    public StatoPratica utente(Long utente) {
        this.utente = utente;
        return this;
    }

    public void setUtente(Long utente) {
        this.utente = utente;
    }

    public Pratica getPratica() {
        return pratica;
    }

    public StatoPratica pratica(Pratica pratica) {
        this.pratica = pratica;
        return this;
    }

    public void setPratica(Pratica pratica) {
        this.pratica = pratica;
    }

    public Stato getStato() {
        return stato;
    }

    public StatoPratica stato(Stato stato) {
        this.stato = stato;
        return this;
    }

    public void setStato(Stato stato) {
        this.stato = stato;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        StatoPratica statoPratica = (StatoPratica) o;
        if (statoPratica.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), statoPratica.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StatoPratica{" +
            "id=" + getId() +
            ", dataInizio='" + getDataInizio() + "'" +
            ", dataFine='" + getDataFine() + "'" +
            ", utente=" + getUtente() +
            "}";
    }
}
