package it.insiel.siagri.npvr.web.rest;

import it.insiel.siagri.npvr.NpvrApp;

import it.insiel.siagri.npvr.domain.Pratica;
import it.insiel.siagri.npvr.repository.PraticaRepository;
import it.insiel.siagri.npvr.service.PraticaService;
import it.insiel.siagri.npvr.service.dto.PraticaDTO;
import it.insiel.siagri.npvr.service.mapper.PraticaMapper;
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
 * Test class for the PraticaResource REST controller.
 *
 * @see PraticaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NpvrApp.class)
public class PraticaResourceIntTest {

    private static final String DEFAULT_NUMERO_PRATICA = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_PRATICA = "BBBBBBBBBB";

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private PraticaRepository praticaRepository;

    @Autowired
    private PraticaMapper praticaMapper;

    @Autowired
    private PraticaService praticaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPraticaMockMvc;

    private Pratica pratica;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PraticaResource praticaResource = new PraticaResource(praticaService);
        this.restPraticaMockMvc = MockMvcBuilders.standaloneSetup(praticaResource)
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
    public static Pratica createEntity(EntityManager em) {
        Pratica pratica = new Pratica()
            .numeroPratica(DEFAULT_NUMERO_PRATICA)
            .nome(DEFAULT_NOME);
        return pratica;
    }

    @Before
    public void initTest() {
        pratica = createEntity(em);
    }

    @Test
    @Transactional
    public void createPratica() throws Exception {
        int databaseSizeBeforeCreate = praticaRepository.findAll().size();

        // Create the Pratica
        PraticaDTO praticaDTO = praticaMapper.toDto(pratica);
        restPraticaMockMvc.perform(post("/api/praticas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(praticaDTO)))
            .andExpect(status().isCreated());

        // Validate the Pratica in the database
        List<Pratica> praticaList = praticaRepository.findAll();
        assertThat(praticaList).hasSize(databaseSizeBeforeCreate + 1);
        Pratica testPratica = praticaList.get(praticaList.size() - 1);
        assertThat(testPratica.getNumeroPratica()).isEqualTo(DEFAULT_NUMERO_PRATICA);
        assertThat(testPratica.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createPraticaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = praticaRepository.findAll().size();

        // Create the Pratica with an existing ID
        pratica.setId(1L);
        PraticaDTO praticaDTO = praticaMapper.toDto(pratica);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPraticaMockMvc.perform(post("/api/praticas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(praticaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Pratica in the database
        List<Pratica> praticaList = praticaRepository.findAll();
        assertThat(praticaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPraticas() throws Exception {
        // Initialize the database
        praticaRepository.saveAndFlush(pratica);

        // Get all the praticaList
        restPraticaMockMvc.perform(get("/api/praticas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pratica.getId().intValue())))
            .andExpect(jsonPath("$.[*].numeroPratica").value(hasItem(DEFAULT_NUMERO_PRATICA.toString())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())));
    }

    @Test
    @Transactional
    public void getPratica() throws Exception {
        // Initialize the database
        praticaRepository.saveAndFlush(pratica);

        // Get the pratica
        restPraticaMockMvc.perform(get("/api/praticas/{id}", pratica.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pratica.getId().intValue()))
            .andExpect(jsonPath("$.numeroPratica").value(DEFAULT_NUMERO_PRATICA.toString()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPratica() throws Exception {
        // Get the pratica
        restPraticaMockMvc.perform(get("/api/praticas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePratica() throws Exception {
        // Initialize the database
        praticaRepository.saveAndFlush(pratica);
        int databaseSizeBeforeUpdate = praticaRepository.findAll().size();

        // Update the pratica
        Pratica updatedPratica = praticaRepository.findOne(pratica.getId());
        // Disconnect from session so that the updates on updatedPratica are not directly saved in db
        em.detach(updatedPratica);
        updatedPratica
            .numeroPratica(UPDATED_NUMERO_PRATICA)
            .nome(UPDATED_NOME);
        PraticaDTO praticaDTO = praticaMapper.toDto(updatedPratica);

        restPraticaMockMvc.perform(put("/api/praticas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(praticaDTO)))
            .andExpect(status().isOk());

        // Validate the Pratica in the database
        List<Pratica> praticaList = praticaRepository.findAll();
        assertThat(praticaList).hasSize(databaseSizeBeforeUpdate);
        Pratica testPratica = praticaList.get(praticaList.size() - 1);
        assertThat(testPratica.getNumeroPratica()).isEqualTo(UPDATED_NUMERO_PRATICA);
        assertThat(testPratica.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingPratica() throws Exception {
        int databaseSizeBeforeUpdate = praticaRepository.findAll().size();

        // Create the Pratica
        PraticaDTO praticaDTO = praticaMapper.toDto(pratica);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPraticaMockMvc.perform(put("/api/praticas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(praticaDTO)))
            .andExpect(status().isCreated());

        // Validate the Pratica in the database
        List<Pratica> praticaList = praticaRepository.findAll();
        assertThat(praticaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePratica() throws Exception {
        // Initialize the database
        praticaRepository.saveAndFlush(pratica);
        int databaseSizeBeforeDelete = praticaRepository.findAll().size();

        // Get the pratica
        restPraticaMockMvc.perform(delete("/api/praticas/{id}", pratica.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Pratica> praticaList = praticaRepository.findAll();
        assertThat(praticaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pratica.class);
        Pratica pratica1 = new Pratica();
        pratica1.setId(1L);
        Pratica pratica2 = new Pratica();
        pratica2.setId(pratica1.getId());
        assertThat(pratica1).isEqualTo(pratica2);
        pratica2.setId(2L);
        assertThat(pratica1).isNotEqualTo(pratica2);
        pratica1.setId(null);
        assertThat(pratica1).isNotEqualTo(pratica2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PraticaDTO.class);
        PraticaDTO praticaDTO1 = new PraticaDTO();
        praticaDTO1.setId(1L);
        PraticaDTO praticaDTO2 = new PraticaDTO();
        assertThat(praticaDTO1).isNotEqualTo(praticaDTO2);
        praticaDTO2.setId(praticaDTO1.getId());
        assertThat(praticaDTO1).isEqualTo(praticaDTO2);
        praticaDTO2.setId(2L);
        assertThat(praticaDTO1).isNotEqualTo(praticaDTO2);
        praticaDTO1.setId(null);
        assertThat(praticaDTO1).isNotEqualTo(praticaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(praticaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(praticaMapper.fromId(null)).isNull();
    }
}
