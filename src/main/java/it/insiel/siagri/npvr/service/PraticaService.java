package it.insiel.siagri.npvr.service;

import it.insiel.siagri.npvr.service.dto.PraticaDTO;
import java.util.List;

/**
 * Service Interface for managing Pratica.
 */
public interface PraticaService {

    /**
     * Save a pratica.
     *
     * @param praticaDTO the entity to save
     * @return the persisted entity
     */
    PraticaDTO save(PraticaDTO praticaDTO);

    /**
     * Get all the praticas.
     *
     * @return the list of entities
     */
    List<PraticaDTO> findAll();

    /**
     * Get the "id" pratica.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PraticaDTO findOne(Long id);

    /**
     * Delete the "id" pratica.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
