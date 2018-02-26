package it.insiel.siagri.npvr.service.mapper;

import it.insiel.siagri.npvr.domain.*;
import it.insiel.siagri.npvr.service.dto.PraticaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Pratica and its DTO PraticaDTO.
 */
@Mapper(componentModel = "spring", uses = {AnnataViticolaMapper.class, TipoPraticaMapper.class})
public interface PraticaMapper extends EntityMapper<PraticaDTO, Pratica> {

    @Mapping(source = "annataViticola.id", target = "annataViticolaId")
    @Mapping(source = "tipoPratica.id", target = "tipoPraticaId")
    PraticaDTO toDto(Pratica pratica);

    @Mapping(source = "annataViticolaId", target = "annataViticola")
    @Mapping(source = "tipoPraticaId", target = "tipoPratica")
    Pratica toEntity(PraticaDTO praticaDTO);

    default Pratica fromId(Long id) {
        if (id == null) {
            return null;
        }
        Pratica pratica = new Pratica();
        pratica.setId(id);
        return pratica;
    }
}
