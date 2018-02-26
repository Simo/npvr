package it.insiel.siagri.npvr.service.impl;

import it.insiel.siagri.npvr.service.AnnataViticolaService;
import it.insiel.siagri.npvr.domain.AnnataViticola;
import it.insiel.siagri.npvr.repository.AnnataViticolaRepository;
import it.insiel.siagri.npvr.service.dto.AnnataViticolaDTO;
import it.insiel.siagri.npvr.service.mapper.AnnataViticolaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing AnnataViticola.
 */
@Service
@Transactional
public class AnnataViticolaServiceImpl implements AnnataViticolaService {

    private final Logger log = LoggerFactory.getLogger(AnnataViticolaServiceImpl.class);

    private final AnnataViticolaRepository annataViticolaRepository;

    private final AnnataViticolaMapper annataViticolaMapper;

    public AnnataViticolaServiceImpl(AnnataViticolaRepository annataViticolaRepository, AnnataViticolaMapper annataViticolaMapper) {
        this.annataViticolaRepository = annataViticolaRepository;
        this.annataViticolaMapper = annataViticolaMapper;
    }

    /**
     * Save a annataViticola.
     *
     * @param annataViticolaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AnnataViticolaDTO save(AnnataViticolaDTO annataViticolaDTO) {
        log.debug("Request to save AnnataViticola : {}", annataViticolaDTO);
        AnnataViticola annataViticola = annataViticolaMapper.toEntity(annataViticolaDTO);
        annataViticola = annataViticolaRepository.save(annataViticola);
        return annataViticolaMapper.toDto(annataViticola);
    }

    /**
     * Get all the annataViticolas.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AnnataViticolaDTO> findAll() {
        log.debug("Request to get all AnnataViticolas");
        return annataViticolaRepository.findAll().stream()
            .map(annataViticolaMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one annataViticola by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AnnataViticolaDTO findOne(Long id) {
        log.debug("Request to get AnnataViticola : {}", id);
        AnnataViticola annataViticola = annataViticolaRepository.findOne(id);
        return annataViticolaMapper.toDto(annataViticola);
    }

    /**
     * Delete the annataViticola by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AnnataViticola : {}", id);
        annataViticolaRepository.delete(id);
    }
}
