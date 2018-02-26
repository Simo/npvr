package it.insiel.siagri.npvr.service.dto;


import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the AnnataViticola entity.
 */
public class AnnataViticolaDTO implements Serializable {

    private Long id;

    private String anno;

    private String descrizione;

    private LocalDate dataInizio;

    private LocalDate dataFine;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnno() {
        return anno;
    }

    public void setAnno(String anno) {
        this.anno = anno;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public LocalDate getDataInizio() {
        return dataInizio;
    }

    public void setDataInizio(LocalDate dataInizio) {
        this.dataInizio = dataInizio;
    }

    public LocalDate getDataFine() {
        return dataFine;
    }

    public void setDataFine(LocalDate dataFine) {
        this.dataFine = dataFine;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AnnataViticolaDTO annataViticolaDTO = (AnnataViticolaDTO) o;
        if(annataViticolaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), annataViticolaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AnnataViticolaDTO{" +
            "id=" + getId() +
            ", anno='" + getAnno() + "'" +
            ", descrizione='" + getDescrizione() + "'" +
            ", dataInizio='" + getDataInizio() + "'" +
            ", dataFine='" + getDataFine() + "'" +
            "}";
    }
}
