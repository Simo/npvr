package it.insiel.siagri.npvr.web.rest;

import it.insiel.siagri.npvr.NpvrApp;

import it.insiel.siagri.npvr.domain.StatoPratica;
import it.insiel.siagri.npvr.repository.StatoPraticaRepository;
import it.insiel.siagri.npvr.service.StatoPraticaService;
import it.insiel.siagri.npvr.service.dto.StatoPraticaDTO;
import it.insiel.siagri.npvr.service.mapper.StatoPraticaMapper;
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
 * Test class for the StatoPraticaResource REST controller.
 *
 * @see StatoPraticaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NpvrApp.class)
public class StatoPraticaResourceIntTest {

    private static final LocalDate DEFAULT_DATA_INIZIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_INIZIO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATA_FINE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_FINE = LocalDate.now(ZoneId.systemDefault());

    private static final Long DEFAULT_UTENTE = 1L;
    private static final Long UPDATED_UTENTE = 2L;

    @Autowired
    private StatoPraticaRepository statoPraticaRepository;

    @Autowired
    private StatoPraticaMapper statoPraticaMapper;

    @Autowired
    private StatoPraticaService statoPraticaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStatoPraticaMockMvc;

    private StatoPratica statoPratica;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StatoPraticaResource statoPraticaResource = new StatoPraticaResource(statoPraticaService);
        this.restStatoPraticaMockMvc = MockMvcBuilders.standaloneSetup(statoPraticaResource)
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
    public static StatoPratica createEntity(EntityManager em) {
        StatoPratica statoPratica = new StatoPratica()
            .dataInizio(DEFAULT_DATA_INIZIO)
            .dataFine(DEFAULT_DATA_FINE)
            .utente(DEFAULT_UTENTE);
        return statoPratica;
    }

    @Before
    public void initTest() {
        statoPratica = createEntity(em);
    }

    @Test
    @Transactional
    public void createStatoPratica() throws Exception {
        int databaseSizeBeforeCreate = statoPraticaRepository.findAll().size();

        // Create the StatoPratica
        StatoPraticaDTO statoPraticaDTO = statoPraticaMapper.toDto(statoPratica);
        restStatoPraticaMockMvc.perform(post("/api/stato-praticas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(statoPraticaDTO)))
            .andExpect(status().isCreated());

        // Validate the StatoPratica in the database
        List<StatoPratica> statoPraticaList = statoPraticaRepository.findAll();
        assertThat(statoPraticaList).hasSize(databaseSizeBeforeCreate + 1);
        StatoPratica testStatoPratica = statoPraticaList.get(statoPraticaList.size() - 1);
        assertThat(testStatoPratica.getDataInizio()).isEqualTo(DEFAULT_DATA_INIZIO);
        assertThat(testStatoPratica.getDataFine()).isEqualTo(DEFAULT_DATA_FINE);
        assertThat(testStatoPratica.getUtente()).isEqualTo(DEFAULT_UTENTE);
    }

    @Test
    @Transactional
    public void createStatoPraticaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = statoPraticaRepository.findAll().size();

        // Create the StatoPratica with an existing ID
        statoPratica.setId(1L);
        StatoPraticaDTO statoPraticaDTO = statoPraticaMapper.toDto(statoPratica);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStatoPraticaMockMvc.perform(post("/api/stato-praticas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(statoPraticaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the StatoPratica in the database
        List<StatoPratica> statoPraticaList = statoPraticaRepository.findAll();
        assertThat(statoPraticaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStatoPraticas() throws Exception {
        // Initialize the database
        statoPraticaRepository.saveAndFlush(statoPratica);

        // Get all the statoPraticaList
        restStatoPraticaMockMvc.perform(get("/api/stato-praticas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(statoPratica.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataInizio").value(hasItem(DEFAULT_DATA_INIZIO.toString())))
            .andExpect(jsonPath("$.[*].dataFine").value(hasItem(DEFAULT_DATA_FINE.toString())))
            .andExpect(jsonPath("$.[*].utente").value(hasItem(DEFAULT_UTENTE.intValue())));
    }

    @Test
    @Transactional
    public void getStatoPratica() throws Exception {
        // Initialize the database
        statoPraticaRepository.saveAndFlush(statoPratica);

        // Get the statoPratica
        restStatoPraticaMockMvc.perform(get("/api/stato-praticas/{id}", statoPratica.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(statoPratica.getId().intValue()))
            .andExpect(jsonPath("$.dataInizio").value(DEFAULT_DATA_INIZIO.toString()))
            .andExpect(jsonPath("$.dataFine").value(DEFAULT_DATA_FINE.toString()))
            .andExpect(jsonPath("$.utente").value(DEFAULT_UTENTE.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingStatoPratica() throws Exception {
        // Get the statoPratica
        restStatoPraticaMockMvc.perform(get("/api/stato-praticas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStatoPratica() throws Exception {
        // Initialize the database
        statoPraticaRepository.saveAndFlush(statoPratica);
        int databaseSizeBeforeUpdate = statoPraticaRepository.findAll().size();

        // Update the statoPratica
        StatoPratica updatedStatoPratica = statoPraticaRepository.findOne(statoPratica.getId());
        // Disconnect from session so that the updates on updatedStatoPratica are not directly saved in db
        em.detach(updatedStatoPratica);
        updatedStatoPratica
            .dataInizio(UPDATED_DATA_INIZIO)
            .dataFine(UPDATED_DATA_FINE)
            .utente(UPDATED_UTENTE);
        StatoPraticaDTO statoPraticaDTO = statoPraticaMapper.toDto(updatedStatoPratica);

        restStatoPraticaMockMvc.perform(put("/api/stato-praticas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(statoPraticaDTO)))
            .andExpect(status().isOk());

        // Validate the StatoPratica in the database
        List<StatoPratica> statoPraticaList = statoPraticaRepository.findAll();
        assertThat(statoPraticaList).hasSize(databaseSizeBeforeUpdate);
        StatoPratica testStatoPratica = statoPraticaList.get(statoPraticaList.size() - 1);
        assertThat(testStatoPratica.getDataInizio()).isEqualTo(UPDATED_DATA_INIZIO);
        assertThat(testStatoPratica.getDataFine()).isEqualTo(UPDATED_DATA_FINE);
        assertThat(testStatoPratica.getUtente()).isEqualTo(UPDATED_UTENTE);
    }

    @Test
    @Transactional
    public void updateNonExistingStatoPratica() throws Exception {
        int databaseSizeBeforeUpdate = statoPraticaRepository.findAll().size();

        // Create the StatoPratica
        StatoPraticaDTO statoPraticaDTO = statoPraticaMapper.toDto(statoPratica);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restStatoPraticaMockMvc.perform(put("/api/stato-praticas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(statoPraticaDTO)))
            .andExpect(status().isCreated());

        // Validate the StatoPratica in the database
        List<StatoPratica> statoPraticaList = statoPraticaRepository.findAll();
        assertThat(statoPraticaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteStatoPratica() throws Exception {
        // Initialize the database
        statoPraticaRepository.saveAndFlush(statoPratica);
        int databaseSizeBeforeDelete = statoPraticaRepository.findAll().size();

        // Get the statoPratica
        restStatoPraticaMockMvc.perform(delete("/api/stato-praticas/{id}", statoPratica.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<StatoPratica> statoPraticaList = statoPraticaRepository.findAll();
        assertThat(statoPraticaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StatoPratica.class);
        StatoPratica statoPratica1 = new StatoPratica();
        statoPratica1.setId(1L);
        StatoPratica statoPratica2 = new StatoPratica();
        statoPratica2.setId(statoPratica1.getId());
        assertThat(statoPratica1).isEqualTo(statoPratica2);
        statoPratica2.setId(2L);
        assertThat(statoPratica1).isNotEqualTo(statoPratica2);
        statoPratica1.setId(null);
        assertThat(statoPratica1).isNotEqualTo(statoPratica2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StatoPraticaDTO.class);
        StatoPraticaDTO statoPraticaDTO1 = new StatoPraticaDTO();
        statoPraticaDTO1.setId(1L);
        StatoPraticaDTO statoPraticaDTO2 = new StatoPraticaDTO();
        assertThat(statoPraticaDTO1).isNotEqualTo(statoPraticaDTO2);
        statoPraticaDTO2.setId(statoPraticaDTO1.getId());
        assertThat(statoPraticaDTO1).isEqualTo(statoPraticaDTO2);
        statoPraticaDTO2.setId(2L);
        assertThat(statoPraticaDTO1).isNotEqualTo(statoPraticaDTO2);
        statoPraticaDTO1.setId(null);
        assertThat(statoPraticaDTO1).isNotEqualTo(statoPraticaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(statoPraticaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(statoPraticaMapper.fromId(null)).isNull();
    }
}
