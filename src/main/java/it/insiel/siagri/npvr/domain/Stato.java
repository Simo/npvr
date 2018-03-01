package it.insiel.siagri.npvr.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Stato.
 */
@Entity
@Table(name = "npvr_stato")
public class Stato implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "definizione")
    private String definizione;

    @Column(name = "descrizione")
    private String descrizione;

    @Column(name = "acronimo")
    private String acronimo;

    @Column(name = "codice")
    private String codice;

    @Column(name = "valido_al")
    private LocalDate validoAl;

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

    public Stato definizione(String definizione) {
        this.definizione = definizione;
        return this;
    }

    public void setDefinizione(String definizione) {
        this.definizione = definizione;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public Stato descrizione(String descrizione) {
        this.descrizione = descrizione;
        return this;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public String getAcronimo() {
        return acronimo;
    }

    public Stato acronimo(String acronimo) {
        this.acronimo = acronimo;
        return this;
    }

    public void setAcronimo(String acronimo) {
        this.acronimo = acronimo;
    }

    public String getCodice() {
        return codice;
    }

    public Stato codice(String codice) {
        this.codice = codice;
        return this;
    }

    public void setCodice(String codice) {
        this.codice = codice;
    }

    public LocalDate getValidoAl() {
        return validoAl;
    }

    public Stato validoAl(LocalDate validoAl) {
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
        Stato stato = (Stato) o;
        if (stato.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stato.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Stato{" +
            "id=" + getId() +
            ", definizione='" + getDefinizione() + "'" +
            ", descrizione='" + getDescrizione() + "'" +
            ", acronimo='" + getAcronimo() + "'" +
            ", codice='" + getCodice() + "'" +
            ", validoAl='" + getValidoAl() + "'" +
            "}";
    }
}
