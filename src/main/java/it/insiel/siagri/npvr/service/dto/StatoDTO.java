package it.insiel.siagri.npvr.service.dto;

import java.time.LocalDate;

public class StatoDTO {

    private Long id;
    private String definizione;
    private String descrizione;
    private String acronimo;
    private String codice;
    private LocalDate validoAl;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDefinizione() {
        return definizione;
    }

    public void setDefinizione(String definizione) {
        this.definizione = definizione;
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

    public String getCodice() {
        return codice;
    }

    public void setCodice(String codice) {
        this.codice = codice;
    }

    public LocalDate getValidoAl() {
        return validoAl;
    }

    public void setValidoAl(LocalDate validoAl) {
        this.validoAl = validoAl;
    }
}
