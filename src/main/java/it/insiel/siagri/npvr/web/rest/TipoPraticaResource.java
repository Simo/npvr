package it.insiel.siagri.npvr.web.rest;

import com.codahale.metrics.annotation.Timed;
import it.insiel.siagri.npvr.service.TipoPraticaService;
import it.insiel.siagri.npvr.web.rest.errors.BadRequestAlertException;
import it.insiel.siagri.npvr.web.rest.util.HeaderUtil;
import it.insiel.siagri.npvr.service.dto.TipoPraticaDTO;
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
 * REST controller for managing TipoPratica.
 */
@RestController
@RequestMapping("/api")
public class TipoPraticaResource {

    private final Logger log = LoggerFactory.getLogger(TipoPraticaResource.class);

    private static final String ENTITY_NAME = "tipoPratica";

    private final TipoPraticaService tipoPraticaService;

    public TipoPraticaResource(TipoPraticaService tipoPraticaService) {
        this.tipoPraticaService = tipoPraticaService;
    }

    /**
     * POST  /tipo-praticas : Create a new tipoPratica.
     *
     * @param tipoPraticaDTO the tipoPraticaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tipoPraticaDTO, or with status 400 (Bad Request) if the tipoPratica has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tipo-praticas")
    @Timed
    public ResponseEntity<TipoPraticaDTO> createTipoPratica(@RequestBody TipoPraticaDTO tipoPraticaDTO) throws URISyntaxException {
        log.debug("REST request to save TipoPratica : {}", tipoPraticaDTO);
        if (tipoPraticaDTO.getId() != null) {
            throw new BadRequestAlertException("A new tipoPratica cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoPraticaDTO result = tipoPraticaService.save(tipoPraticaDTO);
        return ResponseEntity.created(new URI("/api/tipo-praticas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tipo-praticas : Updates an existing tipoPratica.
     *
     * @param tipoPraticaDTO the tipoPraticaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tipoPraticaDTO,
     * or with status 400 (Bad Request) if the tipoPraticaDTO is not valid,
     * or with status 500 (Internal Server Error) if the tipoPraticaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tipo-praticas")
    @Timed
    public ResponseEntity<TipoPraticaDTO> updateTipoPratica(@RequestBody TipoPraticaDTO tipoPraticaDTO) throws URISyntaxException {
        log.debug("REST request to update TipoPratica : {}", tipoPraticaDTO);
        if (tipoPraticaDTO.getId() == null) {
            return createTipoPratica(tipoPraticaDTO);
        }
        TipoPraticaDTO result = tipoPraticaService.save(tipoPraticaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tipoPraticaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tipo-praticas : get all the tipoPraticas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tipoPraticas in body
     */
    @GetMapping("/tipo-praticas")
    @Timed
    public List<TipoPraticaDTO> getAllTipoPraticas() {
        log.debug("REST request to get all TipoPraticas");
        return tipoPraticaService.findAll();
        }

    /**
     * GET  /tipo-praticas/:id : get the "id" tipoPratica.
     *
     * @param id the id of the tipoPraticaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tipoPraticaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/tipo-praticas/{id}")
    @Timed
    public ResponseEntity<TipoPraticaDTO> getTipoPratica(@PathVariable Long id) {
        log.debug("REST request to get TipoPratica : {}", id);
        TipoPraticaDTO tipoPraticaDTO = tipoPraticaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tipoPraticaDTO));
    }

    /**
     * DELETE  /tipo-praticas/:id : delete the "id" tipoPratica.
     *
     * @param id the id of the tipoPraticaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tipo-praticas/{id}")
    @Timed
    public ResponseEntity<Void> deleteTipoPratica(@PathVariable Long id) {
        log.debug("REST request to delete TipoPratica : {}", id);
        tipoPraticaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
