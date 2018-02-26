package it.insiel.siagri.npvr.service.impl;

import it.insiel.siagri.npvr.service.TipoPraticaService;
import it.insiel.siagri.npvr.domain.TipoPratica;
import it.insiel.siagri.npvr.repository.TipoPraticaRepository;
import it.insiel.siagri.npvr.service.dto.TipoPraticaDTO;
import it.insiel.siagri.npvr.service.mapper.TipoPraticaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing TipoPratica.
 */
@Service
@Transactional
public class TipoPraticaServiceImpl implements TipoPraticaService {

    private final Logger log = LoggerFactory.getLogger(TipoPraticaServiceImpl.class);

    private final TipoPraticaRepository tipoPraticaRepository;

    private final TipoPraticaMapper tipoPraticaMapper;

    public TipoPraticaServiceImpl(TipoPraticaRepository tipoPraticaRepository, TipoPraticaMapper tipoPraticaMapper) {
        this.tipoPraticaRepository = tipoPraticaRepository;
        this.tipoPraticaMapper = tipoPraticaMapper;
    }

    /**
     * Save a tipoPratica.
     *
     * @param tipoPraticaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TipoPraticaDTO save(TipoPraticaDTO tipoPraticaDTO) {
        log.debug("Request to save TipoPratica : {}", tipoPraticaDTO);
        TipoPratica tipoPratica = tipoPraticaMapper.toEntity(tipoPraticaDTO);
        tipoPratica = tipoPraticaRepository.save(tipoPratica);
        return tipoPraticaMapper.toDto(tipoPratica);
    }

    /**
     * Get all the tipoPraticas.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TipoPraticaDTO> findAll() {
        log.debug("Request to get all TipoPraticas");
        return tipoPraticaRepository.findAll().stream()
            .map(tipoPraticaMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one tipoPratica by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TipoPraticaDTO findOne(Long id) {
        log.debug("Request to get TipoPratica : {}", id);
        TipoPratica tipoPratica = tipoPraticaRepository.findOne(id);
        return tipoPraticaMapper.toDto(tipoPratica);
    }

    /**
     * Delete the tipoPratica by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoPratica : {}", id);
        tipoPraticaRepository.delete(id);
    }
}
