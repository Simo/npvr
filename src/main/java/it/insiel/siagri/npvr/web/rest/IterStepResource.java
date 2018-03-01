package it.insiel.siagri.npvr.web.rest;

import com.codahale.metrics.annotation.Timed;
import it.insiel.siagri.npvr.domain.IterStep;
import it.insiel.siagri.npvr.service.IterStepService;
import it.insiel.siagri.npvr.web.rest.errors.BadRequestAlertException;
import it.insiel.siagri.npvr.web.rest.util.HeaderUtil;
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
 * REST controller for managing IterStep.
 */
@RestController
@RequestMapping("/api")
public class IterStepResource {

    private final Logger log = LoggerFactory.getLogger(IterStepResource.class);

    private static final String ENTITY_NAME = "iterStep";

    private final IterStepService iterStepService;

    public IterStepResource(IterStepService iterStepService) {
        this.iterStepService = iterStepService;
    }

    /**
     * POST  /iter-steps : Create a new iterStep.
     *
     * @param iterStep the iterStep to create
     * @return the ResponseEntity with status 201 (Created) and with body the new iterStep, or with status 400 (Bad Request) if the iterStep has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/iter-steps")
    @Timed
    public ResponseEntity<IterStep> createIterStep(@RequestBody IterStep iterStep) throws URISyntaxException {
        log.debug("REST request to save IterStep : {}", iterStep);
        if (iterStep.getId() != null) {
            throw new BadRequestAlertException("A new iterStep cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IterStep result = iterStepService.save(iterStep);
        return ResponseEntity.created(new URI("/api/iter-steps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /iter-steps : Updates an existing iterStep.
     *
     * @param iterStep the iterStep to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated iterStep,
     * or with status 400 (Bad Request) if the iterStep is not valid,
     * or with status 500 (Internal Server Error) if the iterStep couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/iter-steps")
    @Timed
    public ResponseEntity<IterStep> updateIterStep(@RequestBody IterStep iterStep) throws URISyntaxException {
        log.debug("REST request to update IterStep : {}", iterStep);
        if (iterStep.getId() == null) {
            return createIterStep(iterStep);
        }
        IterStep result = iterStepService.save(iterStep);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, iterStep.getId().toString()))
            .body(result);
    }

    /**
     * GET  /iter-steps : get all the iterSteps.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of iterSteps in body
     */
    @GetMapping("/iter-steps")
    @Timed
    public List<IterStep> getAllIterSteps() {
        log.debug("REST request to get all IterSteps");
        return iterStepService.findAll();
        }

    /**
     * GET  /iter-steps/:id : get the "id" iterStep.
     *
     * @param id the id of the iterStep to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the iterStep, or with status 404 (Not Found)
     */
    @GetMapping("/iter-steps/{id}")
    @Timed
    public ResponseEntity<IterStep> getIterStep(@PathVariable Long id) {
        log.debug("REST request to get IterStep : {}", id);
        IterStep iterStep = iterStepService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(iterStep));
    }

    /**
     * DELETE  /iter-steps/:id : delete the "id" iterStep.
     *
     * @param id the id of the iterStep to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/iter-steps/{id}")
    @Timed
    public ResponseEntity<Void> deleteIterStep(@PathVariable Long id) {
        log.debug("REST request to delete IterStep : {}", id);
        iterStepService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
