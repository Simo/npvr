package it.insiel.siagri.npvr.service;

import it.insiel.siagri.npvr.domain.Stato;
import java.util.List;

/**
 * Service Interface for managing Stato.
 */
public interface StatoService {

    /**
     * Save a stato.
     *
     * @param stato the entity to save
     * @return the persisted entity
     */
    Stato save(Stato stato);

    /**
     * Get all the statoes.
     *
     * @return the list of entities
     */
    List<Stato> findAll();

    /**
     * Get the "id" stato.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Stato findOne(Long id);

    /**
     * Delete the "id" stato.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
