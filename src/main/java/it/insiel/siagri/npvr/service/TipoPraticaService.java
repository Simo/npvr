package it.insiel.siagri.npvr.service;

import it.insiel.siagri.npvr.service.dto.TipoPraticaDTO;
import java.util.List;

/**
 * Service Interface for managing TipoPratica.
 */
public interface TipoPraticaService {

    /**
     * Save a tipoPratica.
     *
     * @param tipoPraticaDTO the entity to save
     * @return the persisted entity
     */
    TipoPraticaDTO save(TipoPraticaDTO tipoPraticaDTO);

    /**
     * Get all the tipoPraticas.
     *
     * @return the list of entities
     */
    List<TipoPraticaDTO> findAll();

    /**
     * Get the "id" tipoPratica.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TipoPraticaDTO findOne(Long id);

    /**
     * Delete the "id" tipoPratica.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
