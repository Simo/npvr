package it.insiel.siagri.npvr.service.dto;


import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the TipoPratica entity.
 */
public class TipoPraticaDTO implements Serializable {

    private Long id;

    private String descrizione;

    private String acronimo;

    private String famiglia;

    private LocalDate validoAl;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public String getAcronimo() {
        return acronimo;
    }

    public void setAcronimo(String acronimo) {
        this.acronimo = acronimo;
    }

    public String getFamiglia() {
        return famiglia;
    }

    public void setFamiglia(String famiglia) {
        this.famiglia = famiglia;
    }

    public LocalDate getValidoAl() {
        return validoAl;
    }

    public void setValidoAl(LocalDate validoAl) {
        this.validoAl = validoAl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TipoPraticaDTO tipoPraticaDTO = (TipoPraticaDTO) o;
        if(tipoPraticaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tipoPraticaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TipoPraticaDTO{" +
            "id=" + getId() +
            ", descrizione='" + getDescrizione() + "'" +
            ", acronimo='" + getAcronimo() + "'" +
            ", famiglia='" + getFamiglia() + "'" +
            ", validoAl='" + getValidoAl() + "'" +
            "}";
    }
}
