package it.insiel.siagri.npvr.service;

import it.insiel.siagri.npvr.service.dto.AnnataViticolaDTO;
import java.util.List;

/**
 * Service Interface for managing AnnataViticola.
 */
public interface AnnataViticolaService {

    /**
     * Save a annataViticola.
     *
     * @param annataViticolaDTO the entity to save
     * @return the persisted entity
     */
    AnnataViticolaDTO save(AnnataViticolaDTO annataViticolaDTO);

    /**
     * Get all the annataViticolas.
     *
     * @return the list of entities
     */
    List<AnnataViticolaDTO> findAll();

    /**
     * Get the "id" annataViticola.
     *
     * @param id the id of the entity
     * @return the entity
     */
    AnnataViticolaDTO findOne(Long id);

    /**
     * Delete the "id" annataViticola.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
