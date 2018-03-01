package it.insiel.siagri.npvr.service.impl;

import it.insiel.siagri.npvr.service.IterStepService;
import it.insiel.siagri.npvr.domain.IterStep;
import it.insiel.siagri.npvr.repository.IterStepRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing IterStep.
 */
@Service
@Transactional
public class IterStepServiceImpl implements IterStepService {

    private final Logger log = LoggerFactory.getLogger(IterStepServiceImpl.class);

    private final IterStepRepository iterStepRepository;

    public IterStepServiceImpl(IterStepRepository iterStepRepository) {
        this.iterStepRepository = iterStepRepository;
    }

    /**
     * Save a iterStep.
     *
     * @param iterStep the entity to save
     * @return the persisted entity
     */
    @Override
    public IterStep save(IterStep iterStep) {
        log.debug("Request to save IterStep : {}", iterStep);
        return iterStepRepository.save(iterStep);
    }

    /**
     * Get all the iterSteps.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<IterStep> findAll() {
        log.debug("Request to get all IterSteps");
        return iterStepRepository.findAll();
    }

    /**
     * Get one iterStep by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public IterStep findOne(Long id) {
        log.debug("Request to get IterStep : {}", id);
        return iterStepRepository.findOne(id);
    }

    /**
     * Delete the iterStep by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete IterStep : {}", id);
        iterStepRepository.delete(id);
    }
}
