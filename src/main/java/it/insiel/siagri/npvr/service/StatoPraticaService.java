package it.insiel.siagri.npvr.service;

import it.insiel.siagri.npvr.service.dto.StatoPraticaDTO;
import java.util.List;

/**
 * Service Interface for managing StatoPratica.
 */
public interface StatoPraticaService {

    /**
     * Save a statoPratica.
     *
     * @param statoPraticaDTO the entity to save
     * @return the persisted entity
     */
    StatoPraticaDTO save(StatoPraticaDTO statoPraticaDTO);

    /**
     * Get all the statoPraticas.
     *
     * @return the list of entities
     */
    List<StatoPraticaDTO> findAll();

    /**
     * Get the "id" statoPratica.
     *
     * @param id the id of the entity
     * @return the entity
     */
    StatoPraticaDTO findOne(Long id);

    /**
     * Delete the "id" statoPratica.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
