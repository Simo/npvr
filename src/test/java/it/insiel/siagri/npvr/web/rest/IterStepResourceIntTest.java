package it.insiel.siagri.npvr.web.rest;

import it.insiel.siagri.npvr.NpvrApp;

import it.insiel.siagri.npvr.domain.IterStep;
import it.insiel.siagri.npvr.repository.IterStepRepository;
import it.insiel.siagri.npvr.service.IterStepService;
import it.insiel.siagri.npvr.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static it.insiel.siagri.npvr.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the IterStepResource REST controller.
 *
 * @see IterStepResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NpvrApp.class)
public class IterStepResourceIntTest {

    private static final String DEFAULT_DEFINIZIONE = "AAAAAAAAAA";
    private static final String UPDATED_DEFINIZIONE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIZIONE = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIZIONE = "BBBBBBBBBB";

    private static final Integer DEFAULT_DIREZIONE = 1;
    private static final Integer UPDATED_DIREZIONE = 2;

    @Autowired
    private IterStepRepository iterStepRepository;

    @Autowired
    private IterStepService iterStepService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restIterStepMockMvc;

    private IterStep iterStep;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IterStepResource iterStepResource = new IterStepResource(iterStepService);
        this.restIterStepMockMvc = MockMvcBuilders.standaloneSetup(iterStepResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IterStep createEntity(EntityManager em) {
        IterStep iterStep = new IterStep()
            .definizione(DEFAULT_DEFINIZIONE)
            .descrizione(DEFAULT_DESCRIZIONE)
            .direzione(DEFAULT_DIREZIONE);
        return iterStep;
    }

    @Before
    public void initTest() {
        iterStep = createEntity(em);
    }

    @Test
    @Transactional
    public void createIterStep() throws Exception {
        int databaseSizeBeforeCreate = iterStepRepository.findAll().size();

        // Create the IterStep
        restIterStepMockMvc.perform(post("/api/iter-steps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iterStep)))
            .andExpect(status().isCreated());

        // Validate the IterStep in the database
        List<IterStep> iterStepList = iterStepRepository.findAll();
        assertThat(iterStepList).hasSize(databaseSizeBeforeCreate + 1);
        IterStep testIterStep = iterStepList.get(iterStepList.size() - 1);
        assertThat(testIterStep.getDefinizione()).isEqualTo(DEFAULT_DEFINIZIONE);
        assertThat(testIterStep.getDescrizione()).isEqualTo(DEFAULT_DESCRIZIONE);
        assertThat(testIterStep.getDirezione()).isEqualTo(DEFAULT_DIREZIONE);
    }

    @Test
    @Transactional
    public void createIterStepWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = iterStepRepository.findAll().size();

        // Create the IterStep with an existing ID
        iterStep.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIterStepMockMvc.perform(post("/api/iter-steps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iterStep)))
            .andExpect(status().isBadRequest());

        // Validate the IterStep in the database
        List<IterStep> iterStepList = iterStepRepository.findAll();
        assertThat(iterStepList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIterSteps() throws Exception {
        // Initialize the database
        iterStepRepository.saveAndFlush(iterStep);

        // Get all the iterStepList
        restIterStepMockMvc.perform(get("/api/iter-steps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(iterStep.getId().intValue())))
            .andExpect(jsonPath("$.[*].definizione").value(hasItem(DEFAULT_DEFINIZIONE.toString())))
            .andExpect(jsonPath("$.[*].descrizione").value(hasItem(DEFAULT_DESCRIZIONE.toString())))
            .andExpect(jsonPath("$.[*].direzione").value(hasItem(DEFAULT_DIREZIONE)));
    }

    @Test
    @Transactional
    public void getIterStep() throws Exception {
        // Initialize the database
        iterStepRepository.saveAndFlush(iterStep);

        // Get the iterStep
        restIterStepMockMvc.perform(get("/api/iter-steps/{id}", iterStep.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(iterStep.getId().intValue()))
            .andExpect(jsonPath("$.definizione").value(DEFAULT_DEFINIZIONE.toString()))
            .andExpect(jsonPath("$.descrizione").value(DEFAULT_DESCRIZIONE.toString()))
            .andExpect(jsonPath("$.direzione").value(DEFAULT_DIREZIONE));
    }

    @Test
    @Transactional
    public void getNonExistingIterStep() throws Exception {
        // Get the iterStep
        restIterStepMockMvc.perform(get("/api/iter-steps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIterStep() throws Exception {
        // Initialize the database
        iterStepService.save(iterStep);

        int databaseSizeBeforeUpdate = iterStepRepository.findAll().size();

        // Update the iterStep
        IterStep updatedIterStep = iterStepRepository.findOne(iterStep.getId());
        // Disconnect from session so that the updates on updatedIterStep are not directly saved in db
        em.detach(updatedIterStep);
        updatedIterStep
            .definizione(UPDATED_DEFINIZIONE)
            .descrizione(UPDATED_DESCRIZIONE)
            .direzione(UPDATED_DIREZIONE);

        restIterStepMockMvc.perform(put("/api/iter-steps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIterStep)))
            .andExpect(status().isOk());

        // Validate the IterStep in the database
        List<IterStep> iterStepList = iterStepRepository.findAll();
        assertThat(iterStepList).hasSize(databaseSizeBeforeUpdate);
        IterStep testIterStep = iterStepList.get(iterStepList.size() - 1);
        assertThat(testIterStep.getDefinizione()).isEqualTo(UPDATED_DEFINIZIONE);
        assertThat(testIterStep.getDescrizione()).isEqualTo(UPDATED_DESCRIZIONE);
        assertThat(testIterStep.getDirezione()).isEqualTo(UPDATED_DIREZIONE);
    }

    @Test
    @Transactional
    public void updateNonExistingIterStep() throws Exception {
        int databaseSizeBeforeUpdate = iterStepRepository.findAll().size();

        // Create the IterStep

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIterStepMockMvc.perform(put("/api/iter-steps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iterStep)))
            .andExpect(status().isCreated());

        // Validate the IterStep in the database
        List<IterStep> iterStepList = iterStepRepository.findAll();
        assertThat(iterStepList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteIterStep() throws Exception {
        // Initialize the database
        iterStepService.save(iterStep);

        int databaseSizeBeforeDelete = iterStepRepository.findAll().size();

        // Get the iterStep
        restIterStepMockMvc.perform(delete("/api/iter-steps/{id}", iterStep.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IterStep> iterStepList = iterStepRepository.findAll();
        assertThat(iterStepList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IterStep.class);
        IterStep iterStep1 = new IterStep();
        iterStep1.setId(1L);
        IterStep iterStep2 = new IterStep();
        iterStep2.setId(iterStep1.getId());
        assertThat(iterStep1).isEqualTo(iterStep2);
        iterStep2.setId(2L);
        assertThat(iterStep1).isNotEqualTo(iterStep2);
        iterStep1.setId(null);
        assertThat(iterStep1).isNotEqualTo(iterStep2);
    }
}
