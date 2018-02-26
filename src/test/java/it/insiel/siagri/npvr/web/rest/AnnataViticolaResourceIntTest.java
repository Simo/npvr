package it.insiel.siagri.npvr.web.rest;

import it.insiel.siagri.npvr.NpvrApp;

import it.insiel.siagri.npvr.domain.AnnataViticola;
import it.insiel.siagri.npvr.repository.AnnataViticolaRepository;
import it.insiel.siagri.npvr.service.AnnataViticolaService;
import it.insiel.siagri.npvr.service.dto.AnnataViticolaDTO;
import it.insiel.siagri.npvr.service.mapper.AnnataViticolaMapper;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static it.insiel.siagri.npvr.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AnnataViticolaResource REST controller.
 *
 * @see AnnataViticolaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NpvrApp.class)
public class AnnataViticolaResourceIntTest {

    private static final String DEFAULT_ANNO = "AAAAAAAAAA";
    private static final String UPDATED_ANNO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIZIONE = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIZIONE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATA_INIZIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_INIZIO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATA_FINE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_FINE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private AnnataViticolaRepository annataViticolaRepository;

    @Autowired
    private AnnataViticolaMapper annataViticolaMapper;

    @Autowired
    private AnnataViticolaService annataViticolaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAnnataViticolaMockMvc;

    private AnnataViticola annataViticola;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AnnataViticolaResource annataViticolaResource = new AnnataViticolaResource(annataViticolaService);
        this.restAnnataViticolaMockMvc = MockMvcBuilders.standaloneSetup(annataViticolaResource)
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
    public static AnnataViticola createEntity(EntityManager em) {
        AnnataViticola annataViticola = new AnnataViticola()
            .anno(DEFAULT_ANNO)
            .descrizione(DEFAULT_DESCRIZIONE)
            .dataInizio(DEFAULT_DATA_INIZIO)
            .dataFine(DEFAULT_DATA_FINE);
        return annataViticola;
    }

    @Before
    public void initTest() {
        annataViticola = createEntity(em);
    }

    @Test
    @Transactional
    public void createAnnataViticola() throws Exception {
        int databaseSizeBeforeCreate = annataViticolaRepository.findAll().size();

        // Create the AnnataViticola
        AnnataViticolaDTO annataViticolaDTO = annataViticolaMapper.toDto(annataViticola);
        restAnnataViticolaMockMvc.perform(post("/api/annata-viticolas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annataViticolaDTO)))
            .andExpect(status().isCreated());

        // Validate the AnnataViticola in the database
        List<AnnataViticola> annataViticolaList = annataViticolaRepository.findAll();
        assertThat(annataViticolaList).hasSize(databaseSizeBeforeCreate + 1);
        AnnataViticola testAnnataViticola = annataViticolaList.get(annataViticolaList.size() - 1);
        assertThat(testAnnataViticola.getAnno()).isEqualTo(DEFAULT_ANNO);
        assertThat(testAnnataViticola.getDescrizione()).isEqualTo(DEFAULT_DESCRIZIONE);
        assertThat(testAnnataViticola.getDataInizio()).isEqualTo(DEFAULT_DATA_INIZIO);
        assertThat(testAnnataViticola.getDataFine()).isEqualTo(DEFAULT_DATA_FINE);
    }

    @Test
    @Transactional
    public void createAnnataViticolaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = annataViticolaRepository.findAll().size();

        // Create the AnnataViticola with an existing ID
        annataViticola.setId(1L);
        AnnataViticolaDTO annataViticolaDTO = annataViticolaMapper.toDto(annataViticola);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnnataViticolaMockMvc.perform(post("/api/annata-viticolas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annataViticolaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AnnataViticola in the database
        List<AnnataViticola> annataViticolaList = annataViticolaRepository.findAll();
        assertThat(annataViticolaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAnnataViticolas() throws Exception {
        // Initialize the database
        annataViticolaRepository.saveAndFlush(annataViticola);

        // Get all the annataViticolaList
        restAnnataViticolaMockMvc.perform(get("/api/annata-viticolas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(annataViticola.getId().intValue())))
            .andExpect(jsonPath("$.[*].anno").value(hasItem(DEFAULT_ANNO.toString())))
            .andExpect(jsonPath("$.[*].descrizione").value(hasItem(DEFAULT_DESCRIZIONE.toString())))
            .andExpect(jsonPath("$.[*].dataInizio").value(hasItem(DEFAULT_DATA_INIZIO.toString())))
            .andExpect(jsonPath("$.[*].dataFine").value(hasItem(DEFAULT_DATA_FINE.toString())));
    }

    @Test
    @Transactional
    public void getAnnataViticola() throws Exception {
        // Initialize the database
        annataViticolaRepository.saveAndFlush(annataViticola);

        // Get the annataViticola
        restAnnataViticolaMockMvc.perform(get("/api/annata-viticolas/{id}", annataViticola.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(annataViticola.getId().intValue()))
            .andExpect(jsonPath("$.anno").value(DEFAULT_ANNO.toString()))
            .andExpect(jsonPath("$.descrizione").value(DEFAULT_DESCRIZIONE.toString()))
            .andExpect(jsonPath("$.dataInizio").value(DEFAULT_DATA_INIZIO.toString()))
            .andExpect(jsonPath("$.dataFine").value(DEFAULT_DATA_FINE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAnnataViticola() throws Exception {
        // Get the annataViticola
        restAnnataViticolaMockMvc.perform(get("/api/annata-viticolas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAnnataViticola() throws Exception {
        // Initialize the database
        annataViticolaRepository.saveAndFlush(annataViticola);
        int databaseSizeBeforeUpdate = annataViticolaRepository.findAll().size();

        // Update the annataViticola
        AnnataViticola updatedAnnataViticola = annataViticolaRepository.findOne(annataViticola.getId());
        // Disconnect from session so that the updates on updatedAnnataViticola are not directly saved in db
        em.detach(updatedAnnataViticola);
        updatedAnnataViticola
            .anno(UPDATED_ANNO)
            .descrizione(UPDATED_DESCRIZIONE)
            .dataInizio(UPDATED_DATA_INIZIO)
            .dataFine(UPDATED_DATA_FINE);
        AnnataViticolaDTO annataViticolaDTO = annataViticolaMapper.toDto(updatedAnnataViticola);

        restAnnataViticolaMockMvc.perform(put("/api/annata-viticolas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annataViticolaDTO)))
            .andExpect(status().isOk());

        // Validate the AnnataViticola in the database
        List<AnnataViticola> annataViticolaList = annataViticolaRepository.findAll();
        assertThat(annataViticolaList).hasSize(databaseSizeBeforeUpdate);
        AnnataViticola testAnnataViticola = annataViticolaList.get(annataViticolaList.size() - 1);
        assertThat(testAnnataViticola.getAnno()).isEqualTo(UPDATED_ANNO);
        assertThat(testAnnataViticola.getDescrizione()).isEqualTo(UPDATED_DESCRIZIONE);
        assertThat(testAnnataViticola.getDataInizio()).isEqualTo(UPDATED_DATA_INIZIO);
        assertThat(testAnnataViticola.getDataFine()).isEqualTo(UPDATED_DATA_FINE);
    }

    @Test
    @Transactional
    public void updateNonExistingAnnataViticola() throws Exception {
        int databaseSizeBeforeUpdate = annataViticolaRepository.findAll().size();

        // Create the AnnataViticola
        AnnataViticolaDTO annataViticolaDTO = annataViticolaMapper.toDto(annataViticola);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAnnataViticolaMockMvc.perform(put("/api/annata-viticolas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annataViticolaDTO)))
            .andExpect(status().isCreated());

        // Validate the AnnataViticola in the database
        List<AnnataViticola> annataViticolaList = annataViticolaRepository.findAll();
        assertThat(annataViticolaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAnnataViticola() throws Exception {
        // Initialize the database
        annataViticolaRepository.saveAndFlush(annataViticola);
        int databaseSizeBeforeDelete = annataViticolaRepository.findAll().size();

        // Get the annataViticola
        restAnnataViticolaMockMvc.perform(delete("/api/annata-viticolas/{id}", annataViticola.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AnnataViticola> annataViticolaList = annataViticolaRepository.findAll();
        assertThat(annataViticolaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AnnataViticola.class);
        AnnataViticola annataViticola1 = new AnnataViticola();
        annataViticola1.setId(1L);
        AnnataViticola annataViticola2 = new AnnataViticola();
        annataViticola2.setId(annataViticola1.getId());
        assertThat(annataViticola1).isEqualTo(annataViticola2);
        annataViticola2.setId(2L);
        assertThat(annataViticola1).isNotEqualTo(annataViticola2);
        annataViticola1.setId(null);
        assertThat(annataViticola1).isNotEqualTo(annataViticola2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AnnataViticolaDTO.class);
        AnnataViticolaDTO annataViticolaDTO1 = new AnnataViticolaDTO();
        annataViticolaDTO1.setId(1L);
        AnnataViticolaDTO annataViticolaDTO2 = new AnnataViticolaDTO();
        assertThat(annataViticolaDTO1).isNotEqualTo(annataViticolaDTO2);
        annataViticolaDTO2.setId(annataViticolaDTO1.getId());
        assertThat(annataViticolaDTO1).isEqualTo(annataViticolaDTO2);
        annataViticolaDTO2.setId(2L);
        assertThat(annataViticolaDTO1).isNotEqualTo(annataViticolaDTO2);
        annataViticolaDTO1.setId(null);
        assertThat(annataViticolaDTO1).isNotEqualTo(annataViticolaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(annataViticolaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(annataViticolaMapper.fromId(null)).isNull();
    }
}
