package it.insiel.siagri.npvr.web.rest;

import it.insiel.siagri.npvr.NpvrApp;

import it.insiel.siagri.npvr.domain.Stato;
import it.insiel.siagri.npvr.repository.StatoRepository;
import it.insiel.siagri.npvr.service.StatoService;
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
 * Test class for the StatoResource REST controller.
 *
 * @see StatoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NpvrApp.class)
public class StatoResourceIntTest {

    private static final String DEFAULT_DEFINIZIONE = "AAAAAAAAAA";
    private static final String UPDATED_DEFINIZIONE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIZIONE = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIZIONE = "BBBBBBBBBB";

    private static final String DEFAULT_ACRONIMO = "AAAAAAAAAA";
    private static final String UPDATED_ACRONIMO = "BBBBBBBBBB";

    private static final String DEFAULT_CODICE = "AAAAAAAAAA";
    private static final String UPDATED_CODICE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_VALIDO_AL = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_VALIDO_AL = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private StatoRepository statoRepository;

    @Autowired
    private StatoService statoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStatoMockMvc;

    private Stato stato;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StatoResource statoResource = new StatoResource(statoService);
        this.restStatoMockMvc = MockMvcBuilders.standaloneSetup(statoResource)
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
    public static Stato createEntity(EntityManager em) {
        Stato stato = new Stato()
            .definizione(DEFAULT_DEFINIZIONE)
            .descrizione(DEFAULT_DESCRIZIONE)
            .acronimo(DEFAULT_ACRONIMO)
            .codice(DEFAULT_CODICE)
            .validoAl(DEFAULT_VALIDO_AL);
        return stato;
    }

    @Before
    public void initTest() {
        stato = createEntity(em);
    }

    @Test
    @Transactional
    public void createStato() throws Exception {
        int databaseSizeBeforeCreate = statoRepository.findAll().size();

        // Create the Stato
        restStatoMockMvc.perform(post("/api/statoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stato)))
            .andExpect(status().isCreated());

        // Validate the Stato in the database
        List<Stato> statoList = statoRepository.findAll();
        assertThat(statoList).hasSize(databaseSizeBeforeCreate + 1);
        Stato testStato = statoList.get(statoList.size() - 1);
        assertThat(testStato.getDefinizione()).isEqualTo(DEFAULT_DEFINIZIONE);
        assertThat(testStato.getDescrizione()).isEqualTo(DEFAULT_DESCRIZIONE);
        assertThat(testStato.getAcronimo()).isEqualTo(DEFAULT_ACRONIMO);
        assertThat(testStato.getCodice()).isEqualTo(DEFAULT_CODICE);
        assertThat(testStato.getValidoAl()).isEqualTo(DEFAULT_VALIDO_AL);
    }

    @Test
    @Transactional
    public void createStatoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = statoRepository.findAll().size();

        // Create the Stato with an existing ID
        stato.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStatoMockMvc.perform(post("/api/statoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stato)))
            .andExpect(status().isBadRequest());

        // Validate the Stato in the database
        List<Stato> statoList = statoRepository.findAll();
        assertThat(statoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStatoes() throws Exception {
        // Initialize the database
        statoRepository.saveAndFlush(stato);

        // Get all the statoList
        restStatoMockMvc.perform(get("/api/statoes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stato.getId().intValue())))
            .andExpect(jsonPath("$.[*].definizione").value(hasItem(DEFAULT_DEFINIZIONE.toString())))
            .andExpect(jsonPath("$.[*].descrizione").value(hasItem(DEFAULT_DESCRIZIONE.toString())))
            .andExpect(jsonPath("$.[*].acronimo").value(hasItem(DEFAULT_ACRONIMO.toString())))
            .andExpect(jsonPath("$.[*].codice").value(hasItem(DEFAULT_CODICE.toString())))
            .andExpect(jsonPath("$.[*].validoAl").value(hasItem(DEFAULT_VALIDO_AL.toString())));
    }

    @Test
    @Transactional
    public void getStato() throws Exception {
        // Initialize the database
        statoRepository.saveAndFlush(stato);

        // Get the stato
        restStatoMockMvc.perform(get("/api/statoes/{id}", stato.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(stato.getId().intValue()))
            .andExpect(jsonPath("$.definizione").value(DEFAULT_DEFINIZIONE.toString()))
            .andExpect(jsonPath("$.descrizione").value(DEFAULT_DESCRIZIONE.toString()))
            .andExpect(jsonPath("$.acronimo").value(DEFAULT_ACRONIMO.toString()))
            .andExpect(jsonPath("$.codice").value(DEFAULT_CODICE.toString()))
            .andExpect(jsonPath("$.validoAl").value(DEFAULT_VALIDO_AL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStato() throws Exception {
        // Get the stato
        restStatoMockMvc.perform(get("/api/statoes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStato() throws Exception {
        // Initialize the database
        statoService.save(stato);

        int databaseSizeBeforeUpdate = statoRepository.findAll().size();

        // Update the stato
        Stato updatedStato = statoRepository.findOne(stato.getId());
        // Disconnect from session so that the updates on updatedStato are not directly saved in db
        em.detach(updatedStato);
        updatedStato
            .definizione(UPDATED_DEFINIZIONE)
            .descrizione(UPDATED_DESCRIZIONE)
            .acronimo(UPDATED_ACRONIMO)
            .codice(UPDATED_CODICE)
            .validoAl(UPDATED_VALIDO_AL);

        restStatoMockMvc.perform(put("/api/statoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStato)))
            .andExpect(status().isOk());

        // Validate the Stato in the database
        List<Stato> statoList = statoRepository.findAll();
        assertThat(statoList).hasSize(databaseSizeBeforeUpdate);
        Stato testStato = statoList.get(statoList.size() - 1);
        assertThat(testStato.getDefinizione()).isEqualTo(UPDATED_DEFINIZIONE);
        assertThat(testStato.getDescrizione()).isEqualTo(UPDATED_DESCRIZIONE);
        assertThat(testStato.getAcronimo()).isEqualTo(UPDATED_ACRONIMO);
        assertThat(testStato.getCodice()).isEqualTo(UPDATED_CODICE);
        assertThat(testStato.getValidoAl()).isEqualTo(UPDATED_VALIDO_AL);
    }

    @Test
    @Transactional
    public void updateNonExistingStato() throws Exception {
        int databaseSizeBeforeUpdate = statoRepository.findAll().size();

        // Create the Stato

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restStatoMockMvc.perform(put("/api/statoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stato)))
            .andExpect(status().isCreated());

        // Validate the Stato in the database
        List<Stato> statoList = statoRepository.findAll();
        assertThat(statoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteStato() throws Exception {
        // Initialize the database
        statoService.save(stato);

        int databaseSizeBeforeDelete = statoRepository.findAll().size();

        // Get the stato
        restStatoMockMvc.perform(delete("/api/statoes/{id}", stato.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Stato> statoList = statoRepository.findAll();
        assertThat(statoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Stato.class);
        Stato stato1 = new Stato();
        stato1.setId(1L);
        Stato stato2 = new Stato();
        stato2.setId(stato1.getId());
        assertThat(stato1).isEqualTo(stato2);
        stato2.setId(2L);
        assertThat(stato1).isNotEqualTo(stato2);
        stato1.setId(null);
        assertThat(stato1).isNotEqualTo(stato2);
    }
}
