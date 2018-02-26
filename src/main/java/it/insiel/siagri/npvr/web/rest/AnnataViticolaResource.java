package it.insiel.siagri.npvr.web.rest;

import com.codahale.metrics.annotation.Timed;
import it.insiel.siagri.npvr.service.AnnataViticolaService;
import it.insiel.siagri.npvr.web.rest.errors.BadRequestAlertException;
import it.insiel.siagri.npvr.web.rest.util.HeaderUtil;
import it.insiel.siagri.npvr.service.dto.AnnataViticolaDTO;
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
 * REST controller for managing AnnataViticola.
 */
@RestController
@RequestMapping("/api")
public class AnnataViticolaResource {

    private final Logger log = LoggerFactory.getLogger(AnnataViticolaResource.class);

    private static final String ENTITY_NAME = "annataViticola";

    private final AnnataViticolaService annataViticolaService;

    public AnnataViticolaResource(AnnataViticolaService annataViticolaService) {
        this.annataViticolaService = annataViticolaService;
    }

    /**
     * POST  /annata-viticolas : Create a new annataViticola.
     *
     * @param annataViticolaDTO the annataViticolaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new annataViticolaDTO, or with status 400 (Bad Request) if the annataViticola has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/annata-viticolas")
    @Timed
    public ResponseEntity<AnnataViticolaDTO> createAnnataViticola(@RequestBody AnnataViticolaDTO annataViticolaDTO) throws URISyntaxException {
        log.debug("REST request to save AnnataViticola : {}", annataViticolaDTO);
        if (annataViticolaDTO.getId() != null) {
            throw new BadRequestAlertException("A new annataViticola cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AnnataViticolaDTO result = annataViticolaService.save(annataViticolaDTO);
        return ResponseEntity.created(new URI("/api/annata-viticolas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /annata-viticolas : Updates an existing annataViticola.
     *
     * @param annataViticolaDTO the annataViticolaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated annataViticolaDTO,
     * or with status 400 (Bad Request) if the annataViticolaDTO is not valid,
     * or with status 500 (Internal Server Error) if the annataViticolaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/annata-viticolas")
    @Timed
    public ResponseEntity<AnnataViticolaDTO> updateAnnataViticola(@RequestBody AnnataViticolaDTO annataViticolaDTO) throws URISyntaxException {
        log.debug("REST request to update AnnataViticola : {}", annataViticolaDTO);
        if (annataViticolaDTO.getId() == null) {
            return createAnnataViticola(annataViticolaDTO);
        }
        AnnataViticolaDTO result = annataViticolaService.save(annataViticolaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, annataViticolaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /annata-viticolas : get all the annataViticolas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of annataViticolas in body
     */
    @GetMapping("/annata-viticolas")
    @Timed
    public List<AnnataViticolaDTO> getAllAnnataViticolas() {
        log.debug("REST request to get all AnnataViticolas");
        return annataViticolaService.findAll();
        }

    /**
     * GET  /annata-viticolas/:id : get the "id" annataViticola.
     *
     * @param id the id of the annataViticolaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the annataViticolaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/annata-viticolas/{id}")
    @Timed
    public ResponseEntity<AnnataViticolaDTO> getAnnataViticola(@PathVariable Long id) {
        log.debug("REST request to get AnnataViticola : {}", id);
        AnnataViticolaDTO annataViticolaDTO = annataViticolaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(annataViticolaDTO));
    }

    /**
     * DELETE  /annata-viticolas/:id : delete the "id" annataViticola.
     *
     * @param id the id of the annataViticolaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/annata-viticolas/{id}")
    @Timed
    public ResponseEntity<Void> deleteAnnataViticola(@PathVariable Long id) {
        log.debug("REST request to delete AnnataViticola : {}", id);
        annataViticolaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
