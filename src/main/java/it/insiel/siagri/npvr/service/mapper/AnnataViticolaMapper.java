package it.insiel.siagri.npvr.service.mapper;

import it.insiel.siagri.npvr.domain.*;
import it.insiel.siagri.npvr.service.dto.AnnataViticolaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity AnnataViticola and its DTO AnnataViticolaDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AnnataViticolaMapper extends EntityMapper<AnnataViticolaDTO, AnnataViticola> {



    default AnnataViticola fromId(Long id) {
        if (id == null) {
            return null;
        }
        AnnataViticola annataViticola = new AnnataViticola();
        annataViticola.setId(id);
        return annataViticola;
    }
}
