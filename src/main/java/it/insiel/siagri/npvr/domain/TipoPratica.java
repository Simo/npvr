package it.insiel.siagri.npvr.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A TipoPratica.
 */
@Entity
@Table(name = "tipo_pratica")
public class TipoPratica implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "descrizione")
    private String descrizione;

    @Column(name = "acronimo")
    private String acronimo;

    @Column(name = "famiglia")
    private String famiglia;

    @Column(name = "valido_al")
    private LocalDate validoAl;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public TipoPratica descrizione(String descrizione) {
        this.descrizione = descrizione;
        return this;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public String getAcronimo() {
        return acronimo;
    }

    public TipoPratica acronimo(String acronimo) {
        this.acronimo = acronimo;
        return this;
    }

    public void setAcronimo(String acronimo) {
        this.acronimo = acronimo;
    }

    public String getFamiglia() {
        return famiglia;
    }

    public TipoPratica famiglia(String famiglia) {
        this.famiglia = famiglia;
        return this;
    }

    public void setFamiglia(String famiglia) {
        this.famiglia = famiglia;
    }

    public LocalDate getValidoAl() {
        return validoAl;
    }

    public TipoPratica validoAl(LocalDate validoAl) {
        this.validoAl = validoAl;
        return this;
    }

    public void setValidoAl(LocalDate validoAl) {
        this.validoAl = validoAl;
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
        TipoPratica tipoPratica = (TipoPratica) o;
        if (tipoPratica.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tipoPratica.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TipoPratica{" +
            "id=" + getId() +
            ", descrizione='" + getDescrizione() + "'" +
            ", acronimo='" + getAcronimo() + "'" +
            ", famiglia='" + getFamiglia() + "'" +
            ", validoAl='" + getValidoAl() + "'" +
            "}";
    }
}
