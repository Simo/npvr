package it.insiel.siagri.npvr.web.rest;

import com.codahale.metrics.annotation.Timed;
import it.insiel.siagri.npvr.service.PraticaService;
import it.insiel.siagri.npvr.web.rest.errors.BadRequestAlertException;
import it.insiel.siagri.npvr.web.rest.util.HeaderUtil;
import it.insiel.siagri.npvr.service.dto.PraticaDTO;
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
 * REST controller for managing Pratica.
 */
@RestController
@RequestMapping("/api")
public class PraticaResource {

    private final Logger log = LoggerFactory.getLogger(PraticaResource.class);

    private static final String ENTITY_NAME = "pratica";

    private final PraticaService praticaService;

    public PraticaResource(PraticaService praticaService) {
        this.praticaService = praticaService;
    }

    /**
     * POST  /praticas : Create a new pratica.
     *
     * @param praticaDTO the praticaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new praticaDTO, or with status 400 (Bad Request) if the pratica has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/praticas")
    @Timed
    public ResponseEntity<PraticaDTO> createPratica(@RequestBody PraticaDTO praticaDTO) throws URISyntaxException {
        log.debug("REST request to save Pratica : {}", praticaDTO);
        if (praticaDTO.getId() != null) {
            throw new BadRequestAlertException("A new pratica cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PraticaDTO result = praticaService.save(praticaDTO);
        return ResponseEntity.created(new URI("/api/praticas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /praticas : Updates an existing pratica.
     *
     * @param praticaDTO the praticaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated praticaDTO,
     * or with status 400 (Bad Request) if the praticaDTO is not valid,
     * or with status 500 (Internal Server Error) if the praticaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/praticas")
    @Timed
    public ResponseEntity<PraticaDTO> updatePratica(@RequestBody PraticaDTO praticaDTO) throws URISyntaxException {
        log.debug("REST request to update Pratica : {}", praticaDTO);
        if (praticaDTO.getId() == null) {
            return createPratica(praticaDTO);
        }
        PraticaDTO result = praticaService.save(praticaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, praticaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /praticas : get all the praticas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of praticas in body
     */
    @GetMapping("/praticas")
    @Timed
    public List<PraticaDTO> getAllPraticas() {
        log.debug("REST request to get all Praticas");
        return praticaService.findAll();
        }

    /**
     * GET  /praticas/:id : get the "id" pratica.
     *
     * @param id the id of the praticaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the praticaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/praticas/{id}")
    @Timed
    public ResponseEntity<PraticaDTO> getPratica(@PathVariable Long id) {
        log.debug("REST request to get Pratica : {}", id);
        PraticaDTO praticaDTO = praticaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(praticaDTO));
    }

    /**
     * DELETE  /praticas/:id : delete the "id" pratica.
     *
     * @param id the id of the praticaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/praticas/{id}")
    @Timed
    public ResponseEntity<Void> deletePratica(@PathVariable Long id) {
        log.debug("REST request to delete Pratica : {}", id);
        praticaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
