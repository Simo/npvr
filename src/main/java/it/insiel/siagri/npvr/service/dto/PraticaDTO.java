package it.insiel.siagri.npvr.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Pratica entity.
 */
public class PraticaDTO implements Serializable {

    private Long id;

    private String numeroPratica;

    private String nome;

    private Long annataViticolaId;

    private Long tipoPraticaId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroPratica() {
        return numeroPratica;
    }

    public void setNumeroPratica(String numeroPratica) {
        this.numeroPratica = numeroPratica;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getAnnataViticolaId() {
        return annataViticolaId;
    }

    public void setAnnataViticolaId(Long annataViticolaId) {
        this.annataViticolaId = annataViticolaId;
    }

    public Long getTipoPraticaId() {
        return tipoPraticaId;
    }

    public void setTipoPraticaId(Long tipoPraticaId) {
        this.tipoPraticaId = tipoPraticaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PraticaDTO praticaDTO = (PraticaDTO) o;
        if(praticaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), praticaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PraticaDTO{" +
            "id=" + getId() +
            ", numeroPratica='" + getNumeroPratica() + "'" +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
