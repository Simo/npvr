package it.insiel.siagri.npvr.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A IterStep.
 */
@Entity
@Table(name = "npvr_iter_step")
public class IterStep implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "definizione")
    private String definizione;

    @Column(name = "descrizione")
    private String descrizione;

    @Column(name = "direzione")
    private Integer direzione;

    @ManyToOne
    private Stato statoPartenza;

    @ManyToOne
    private Stato statoArrivo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDefinizione() {
        return definizione;
    }

    public IterStep definizione(String definizione) {
        this.definizione = definizione;
        return this;
    }

    public void setDefinizione(String definizione) {
        this.definizione = definizione;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public IterStep descrizione(String descrizione) {
        this.descrizione = descrizione;
        return this;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public Integer getDirezione() {
        return direzione;
    }

    public IterStep direzione(Integer direzione) {
        this.direzione = direzione;
        return this;
    }

    public void setDirezione(Integer direzione) {
        this.direzione = direzione;
    }

    public Stato getStatoPartenza() {
        return statoPartenza;
    }

    public IterStep statoPartenza(Stato stato) {
        this.statoPartenza = stato;
        return this;
    }

    public void setStatoPartenza(Stato stato) {
        this.statoPartenza = stato;
    }

    public Stato getStatoArrivo() {
        return statoArrivo;
    }

    public IterStep statoArrivo(Stato stato) {
        this.statoArrivo = stato;
        return this;
    }

    public void setStatoArrivo(Stato stato) {
        this.statoArrivo = stato;
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
        IterStep iterStep = (IterStep) o;
        if (iterStep.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), iterStep.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IterStep{" +
            "id=" + getId() +
            ", definizione='" + getDefinizione() + "'" +
            ", descrizione='" + getDescrizione() + "'" +
            ", direzione=" + getDirezione() +
            "}";
    }
}
