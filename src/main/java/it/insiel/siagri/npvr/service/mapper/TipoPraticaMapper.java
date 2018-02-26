package it.insiel.siagri.npvr.service.mapper;

import it.insiel.siagri.npvr.domain.*;
import it.insiel.siagri.npvr.service.dto.TipoPraticaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TipoPratica and its DTO TipoPraticaDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TipoPraticaMapper extends EntityMapper<TipoPraticaDTO, TipoPratica> {



    default TipoPratica fromId(Long id) {
        if (id == null) {
            return null;
        }
        TipoPratica tipoPratica = new TipoPratica();
        tipoPratica.setId(id);
        return tipoPratica;
    }
}
