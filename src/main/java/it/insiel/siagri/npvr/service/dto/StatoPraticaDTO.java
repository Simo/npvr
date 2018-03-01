package it.insiel.siagri.npvr.service.dto;


import java.time.LocalDate;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the StatoPratica entity.
 */
public class StatoPraticaDTO implements Serializable {

    private Long id;

    private LocalDate dataInizio;

    private LocalDate dataFine;

    private Long utente;

    private Long praticaId;

    private Long statoId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getUtente() {
        return utente;
    }

    public void setUtente(Long utente) {
        this.utente = utente;
    }

    public Long getPraticaId() {
        return praticaId;
    }

    public void setPraticaId(Long praticaId) {
        this.praticaId = praticaId;
    }

    public Long getStatoId() {
        return statoId;
    }

    public void setStatoId(Long statoId) {
        this.statoId = statoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StatoPraticaDTO statoPraticaDTO = (StatoPraticaDTO) o;
        if(statoPraticaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), statoPraticaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StatoPraticaDTO{" +
            "id=" + getId() +
            ", dataInizio='" + getDataInizio() + "'" +
            ", dataFine='" + getDataFine() + "'" +
            ", utente=" + getUtente() +
            "}";
    }
}
