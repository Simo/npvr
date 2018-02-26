package it.insiel.siagri.npvr.service.impl;

import it.insiel.siagri.npvr.service.PraticaService;
import it.insiel.siagri.npvr.domain.Pratica;
import it.insiel.siagri.npvr.repository.PraticaRepository;
import it.insiel.siagri.npvr.service.dto.PraticaDTO;
import it.insiel.siagri.npvr.service.mapper.PraticaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Pratica.
 */
@Service
@Transactional
public class PraticaServiceImpl implements PraticaService {

    private final Logger log = LoggerFactory.getLogger(PraticaServiceImpl.class);

    private final PraticaRepository praticaRepository;

    private final PraticaMapper praticaMapper;

    public PraticaServiceImpl(PraticaRepository praticaRepository, PraticaMapper praticaMapper) {
        this.praticaRepository = praticaRepository;
        this.praticaMapper = praticaMapper;
    }

    /**
     * Save a pratica.
     *
     * @param praticaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PraticaDTO save(PraticaDTO praticaDTO) {
        log.debug("Request to save Pratica : {}", praticaDTO);
        Pratica pratica = praticaMapper.toEntity(praticaDTO);
        pratica = praticaRepository.save(pratica);
        return praticaMapper.toDto(pratica);
    }

    /**
     * Get all the praticas.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PraticaDTO> findAll() {
        log.debug("Request to get all Praticas");
        return praticaRepository.findAll().stream()
            .map(praticaMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one pratica by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PraticaDTO findOne(Long id) {
        log.debug("Request to get Pratica : {}", id);
        Pratica pratica = praticaRepository.findOne(id);
        return praticaMapper.toDto(pratica);
    }

    /**
     * Delete the pratica by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Pratica : {}", id);
        praticaRepository.delete(id);
    }
}
