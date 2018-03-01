package it.insiel.siagri.npvr.service.mapper;

import it.insiel.siagri.npvr.domain.*;
import it.insiel.siagri.npvr.service.dto.StatoPraticaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity StatoPratica and its DTO StatoPraticaDTO.
 */
@Mapper(componentModel = "spring", uses = {PraticaMapper.class, StatoMapper.class})
public interface StatoPraticaMapper extends EntityMapper<StatoPraticaDTO, StatoPratica> {

    @Mapping(source = "pratica.id", target = "praticaId")
    @Mapping(source = "stato.id", target = "statoId")
    StatoPraticaDTO toDto(StatoPratica statoPratica);

    @Mapping(source = "praticaId", target = "pratica")
    @Mapping(source = "statoId", target = "stato")
    StatoPratica toEntity(StatoPraticaDTO statoPraticaDTO);

    default StatoPratica fromId(Long id) {
        if (id == null) {
            return null;
        }
        StatoPratica statoPratica = new StatoPratica();
        statoPratica.setId(id);
        return statoPratica;
    }
}
