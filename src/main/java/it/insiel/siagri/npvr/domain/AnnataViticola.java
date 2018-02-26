package it.insiel.siagri.npvr.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A AnnataViticola.
 */
@Entity
@Table(name = "annata_viticola")
public class AnnataViticola implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "anno")
    private String anno;

    @Column(name = "descrizione")
    private String descrizione;

    @Column(name = "data_inizio")
    private LocalDate dataInizio;

    @Column(name = "data_fine")
    private LocalDate dataFine;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnno() {
        return anno;
    }

    public AnnataViticola anno(String anno) {
        this.anno = anno;
        return this;
    }

    public void setAnno(String anno) {
        this.anno = anno;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public AnnataViticola descrizione(String descrizione) {
        this.descrizione = descrizione;
        return this;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public LocalDate getDataInizio() {
        return dataInizio;
    }

    public AnnataViticola dataInizio(LocalDate dataInizio) {
        this.dataInizio = dataInizio;
        return this;
    }

    public void setDataInizio(LocalDate dataInizio) {
        this.dataInizio = dataInizio;
    }

    public LocalDate getDataFine() {
        return dataFine;
    }

    public AnnataViticola dataFine(LocalDate dataFine) {
        this.dataFine = dataFine;
        return this;
    }

    public void setDataFine(LocalDate dataFine) {
        this.dataFine = dataFine;
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
        AnnataViticola annataViticola = (AnnataViticola) o;
        if (annataViticola.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), annataViticola.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AnnataViticola{" +
            "id=" + getId() +
            ", anno='" + getAnno() + "'" +
            ", descrizione='" + getDescrizione() + "'" +
            ", dataInizio='" + getDataInizio() + "'" +
            ", dataFine='" + getDataFine() + "'" +
            "}";
    }
}
