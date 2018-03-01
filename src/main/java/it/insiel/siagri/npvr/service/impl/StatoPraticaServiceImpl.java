package it.insiel.siagri.npvr.service.impl;

import it.insiel.siagri.npvr.service.StatoPraticaService;
import it.insiel.siagri.npvr.domain.StatoPratica;
import it.insiel.siagri.npvr.repository.StatoPraticaRepository;
import it.insiel.siagri.npvr.service.dto.StatoPraticaDTO;
import it.insiel.siagri.npvr.service.mapper.StatoPraticaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing StatoPratica.
 */
@Service
@Transactional
public class StatoPraticaServiceImpl implements StatoPraticaService {

    private final Logger log = LoggerFactory.getLogger(StatoPraticaServiceImpl.class);

    private final StatoPraticaRepository statoPraticaRepository;

    private final StatoPraticaMapper statoPraticaMapper;

    public StatoPraticaServiceImpl(StatoPraticaRepository statoPraticaRepository, StatoPraticaMapper statoPraticaMapper) {
        this.statoPraticaRepository = statoPraticaRepository;
        this.statoPraticaMapper = statoPraticaMapper;
    }

    /**
     * Save a statoPratica.
     *
     * @param statoPraticaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public StatoPraticaDTO save(StatoPraticaDTO statoPraticaDTO) {
        log.debug("Request to save StatoPratica : {}", statoPraticaDTO);
        StatoPratica statoPratica = statoPraticaMapper.toEntity(statoPraticaDTO);
        statoPratica = statoPraticaRepository.save(statoPratica);
        return statoPraticaMapper.toDto(statoPratica);
    }

    /**
     * Get all the statoPraticas.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<StatoPraticaDTO> findAll() {
        log.debug("Request to get all StatoPraticas");
        return statoPraticaRepository.findAll().stream()
            .map(statoPraticaMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one statoPratica by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public StatoPraticaDTO findOne(Long id) {
        log.debug("Request to get StatoPratica : {}", id);
        StatoPratica statoPratica = statoPraticaRepository.findOne(id);
        return statoPraticaMapper.toDto(statoPratica);
    }

    /**
     * Delete the statoPratica by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete StatoPratica : {}", id);
        statoPraticaRepository.delete(id);
    }
}
