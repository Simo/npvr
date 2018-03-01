package it.insiel.siagri.npvr.service.mapper;

import it.insiel.siagri.npvr.service.dto.StatoDTO;
import it.insiel.siagri.npvr.domain.*;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface StatoMapper extends EntityMapper<StatoDTO, Stato>{

    default Stato fromId(Long id){
        if(id == null){
            return null;
        }
        Stato stato = new Stato();
        stato.setId(id);
        return stato;
    }

}
