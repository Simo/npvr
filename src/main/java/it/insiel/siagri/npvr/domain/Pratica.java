package it.insiel.siagri.npvr.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Pratica.
 */
@Entity
@Table(name = "pratica")
public class Pratica implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "numero_pratica")
    private String numeroPratica;

    @Column(name = "nome")
    private String nome;

    @ManyToOne
    private AnnataViticola annataViticola;

    @ManyToOne
    private TipoPratica tipoPratica;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroPratica() {
        return numeroPratica;
    }

    public Pratica numeroPratica(String numeroPratica) {
        this.numeroPratica = numeroPratica;
        return this;
    }

    public void setNumeroPratica(String numeroPratica) {
        this.numeroPratica = numeroPratica;
    }

    public String getNome() {
        return nome;
    }

    public Pratica nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public AnnataViticola getAnnataViticola() {
        return annataViticola;
    }

    public Pratica annataViticola(AnnataViticola annataViticola) {
        this.annataViticola = annataViticola;
        return this;
    }

    public void setAnnataViticola(AnnataViticola annataViticola) {
        this.annataViticola = annataViticola;
    }

    public TipoPratica getTipoPratica() {
        return tipoPratica;
    }

    public Pratica tipoPratica(TipoPratica tipoPratica) {
        this.tipoPratica = tipoPratica;
        return this;
    }

    public void setTipoPratica(TipoPratica tipoPratica) {
        this.tipoPratica = tipoPratica;
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
        Pratica pratica = (Pratica) o;
        if (pratica.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pratica.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Pratica{" +
            "id=" + getId() +
            ", numeroPratica='" + getNumeroPratica() + "'" +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
