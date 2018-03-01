package it.insiel.siagri.npvr.web.rest;

import com.codahale.metrics.annotation.Timed;
import it.insiel.siagri.npvr.service.StatoPraticaService;
import it.insiel.siagri.npvr.web.rest.errors.BadRequestAlertException;
import it.insiel.siagri.npvr.web.rest.util.HeaderUtil;
import it.insiel.siagri.npvr.service.dto.StatoPraticaDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing StatoPratica.
 */
@RestController
@RequestMapping("/api")
public class StatoPraticaResource {

    private final Logger log = LoggerFactory.getLogger(StatoPraticaResource.class);

    private static final String ENTITY_NAME = "statoPratica";

    private final StatoPraticaService statoPraticaService;

    public StatoPraticaResource(StatoPraticaService statoPraticaService) {
        this.statoPraticaService = statoPraticaService;
    }

    /**
     * POST  /stato-praticas : Create a new statoPratica.
     *
     * @param statoPraticaDTO the statoPraticaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new statoPraticaDTO, or with status 400 (Bad Request) if the statoPratica has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stato-praticas")
    @Timed
    public ResponseEntity<StatoPraticaDTO> createStatoPratica(@RequestBody StatoPraticaDTO statoPraticaDTO) throws URISyntaxException {
        log.debug("REST request to save StatoPratica : {}", statoPraticaDTO);
        if (statoPraticaDTO.getId() != null) {
            throw new BadRequestAlertException("A new statoPratica cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StatoPraticaDTO result = statoPraticaService.save(statoPraticaDTO);
        return ResponseEntity.created(new URI("/api/stato-praticas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stato-praticas : Updates an existing statoPratica.
     *
     * @param statoPraticaDTO the statoPraticaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated statoPraticaDTO,
     * or with status 400 (Bad Request) if the statoPraticaDTO is not valid,
     * or with status 500 (Internal Server Error) if the statoPraticaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stato-praticas")
    @Timed
    public ResponseEntity<StatoPraticaDTO> updateStatoPratica(@RequestBody StatoPraticaDTO statoPraticaDTO) throws URISyntaxException {
        log.debug("REST request to update StatoPratica : {}", statoPraticaDTO);
        if (statoPraticaDTO.getId() == null) {
            return createStatoPratica(statoPraticaDTO);
        }
        StatoPraticaDTO result = statoPraticaService.save(statoPraticaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, statoPraticaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stato-praticas : get all the statoPraticas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of statoPraticas in body
     */
    @GetMapping("/stato-praticas")
    @Timed
    public List<StatoPraticaDTO> getAllStatoPraticas() {
        log.debug("REST request to get all StatoPraticas");
        return statoPraticaService.findAll();
        }

    /**
     * GET  /stato-praticas/:id : get the "id" statoPratica.
     *
     * @param id the id of the statoPraticaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the statoPraticaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/stato-praticas/{id}")
    @Timed
    public ResponseEntity<StatoPraticaDTO> getStatoPratica(@PathVariable Long id) {
        log.debug("REST request to get StatoPratica : {}", id);
        StatoPraticaDTO statoPraticaDTO = statoPraticaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(statoPraticaDTO));
    }

    /**
     * DELETE  /stato-praticas/:id : delete the "id" statoPratica.
     *
     * @param id the id of the statoPraticaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stato-praticas/{id}")
    @Timed
    public ResponseEntity<Void> deleteStatoPratica(@PathVariable Long id) {
        log.debug("REST request to delete StatoPratica : {}", id);
        statoPraticaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
