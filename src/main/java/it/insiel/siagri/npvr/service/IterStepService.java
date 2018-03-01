package it.insiel.siagri.npvr.service;

import it.insiel.siagri.npvr.domain.IterStep;
import java.util.List;

/**
 * Service Interface for managing IterStep.
 */
public interface IterStepService {

    /**
     * Save a iterStep.
     *
     * @param iterStep the entity to save
     * @return the persisted entity
     */
    IterStep save(IterStep iterStep);

    /**
     * Get all the iterSteps.
     *
     * @return the list of entities
     */
    List<IterStep> findAll();

    /**
     * Get the "id" iterStep.
     *
     * @param id the id of the entity
     * @return the entity
     */
    IterStep findOne(Long id);

    /**
     * Delete the "id" iterStep.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
