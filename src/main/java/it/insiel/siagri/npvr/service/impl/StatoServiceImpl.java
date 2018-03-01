package it.insiel.siagri.npvr.service.impl;

import it.insiel.siagri.npvr.service.StatoService;
import it.insiel.siagri.npvr.domain.Stato;
import it.insiel.siagri.npvr.repository.StatoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Stato.
 */
@Service
@Transactional
public class StatoServiceImpl implements StatoService {

    private final Logger log = LoggerFactory.getLogger(StatoServiceImpl.class);

    private final StatoRepository statoRepository;

    public StatoServiceImpl(StatoRepository statoRepository) {
        this.statoRepository = statoRepository;
    }

    /**
     * Save a stato.
     *
     * @param stato the entity to save
     * @return the persisted entity
     */
    @Override
    public Stato save(Stato stato) {
        log.debug("Request to save Stato : {}", stato);
        return statoRepository.save(stato);
    }

    /**
     * Get all the statoes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Stato> findAll() {
        log.debug("Request to get all Statoes");
        return statoRepository.findAll();
    }

    /**
     * Get one stato by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Stato findOne(Long id) {
        log.debug("Request to get Stato : {}", id);
        return statoRepository.findOne(id);
    }

    /**
     * Delete the stato by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Stato : {}", id);
        statoRepository.delete(id);
    }
}
