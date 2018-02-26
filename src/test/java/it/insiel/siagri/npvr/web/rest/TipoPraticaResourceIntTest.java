package it.insiel.siagri.npvr.web.rest;

import it.insiel.siagri.npvr.NpvrApp;

import it.insiel.siagri.npvr.domain.TipoPratica;
import it.insiel.siagri.npvr.repository.TipoPraticaRepository;
import it.insiel.siagri.npvr.service.TipoPraticaService;
import it.insiel.siagri.npvr.service.dto.TipoPraticaDTO;
import it.insiel.siagri.npvr.service.mapper.TipoPraticaMapper;
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
 * Test class for the TipoPraticaResource REST controller.
 *
 * @see TipoPraticaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NpvrApp.class)
public class TipoPraticaResourceIntTest {

    private static final String DEFAULT_DESCRIZIONE = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIZIONE = "BBBBBBBBBB";

    private static final String DEFAULT_ACRONIMO = "AAAAAAAAAA";
    private static final String UPDATED_ACRONIMO = "BBBBBBBBBB";

    private static final String DEFAULT_FAMIGLIA = "AAAAAAAAAA";
    private static final String UPDATED_FAMIGLIA = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_VALIDO_AL = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_VALIDO_AL = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private TipoPraticaRepository tipoPraticaRepository;

    @Autowired
    private TipoPraticaMapper tipoPraticaMapper;

    @Autowired
    private TipoPraticaService tipoPraticaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTipoPraticaMockMvc;

    private TipoPratica tipoPratica;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoPraticaResource tipoPraticaResource = new TipoPraticaResource(tipoPraticaService);
        this.restTipoPraticaMockMvc = MockMvcBuilders.standaloneSetup(tipoPraticaResource)
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
    public static TipoPratica createEntity(EntityManager em) {
        TipoPratica tipoPratica = new TipoPratica()
            .descrizione(DEFAULT_DESCRIZIONE)
            .acronimo(DEFAULT_ACRONIMO)
            .famiglia(DEFAULT_FAMIGLIA)
            .validoAl(DEFAULT_VALIDO_AL);
        return tipoPratica;
    }

    @Before
    public void initTest() {
        tipoPratica = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoPratica() throws Exception {
        int databaseSizeBeforeCreate = tipoPraticaRepository.findAll().size();

        // Create the TipoPratica
        TipoPraticaDTO tipoPraticaDTO = tipoPraticaMapper.toDto(tipoPratica);
        restTipoPraticaMockMvc.perform(post("/api/tipo-praticas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoPraticaDTO)))
            .andExpect(status().isCreated());

        // Validate the TipoPratica in the database
        List<TipoPratica> tipoPraticaList = tipoPraticaRepository.findAll();
        assertThat(tipoPraticaList).hasSize(databaseSizeBeforeCreate + 1);
        TipoPratica testTipoPratica = tipoPraticaList.get(tipoPraticaList.size() - 1);
        assertThat(testTipoPratica.getDescrizione()).isEqualTo(DEFAULT_DESCRIZIONE);
        assertThat(testTipoPratica.getAcronimo()).isEqualTo(DEFAULT_ACRONIMO);
        assertThat(testTipoPratica.getFamiglia()).isEqualTo(DEFAULT_FAMIGLIA);
        assertThat(testTipoPratica.getValidoAl()).isEqualTo(DEFAULT_VALIDO_AL);
    }

    @Test
    @Transactional
    public void createTipoPraticaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoPraticaRepository.findAll().size();

        // Create the TipoPratica with an existing ID
        tipoPratica.setId(1L);
        TipoPraticaDTO tipoPraticaDTO = tipoPraticaMapper.toDto(tipoPratica);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoPraticaMockMvc.perform(post("/api/tipo-praticas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoPraticaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TipoPratica in the database
        List<TipoPratica> tipoPraticaList = tipoPraticaRepository.findAll();
        assertThat(tipoPraticaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTipoPraticas() throws Exception {
        // Initialize the database
        tipoPraticaRepository.saveAndFlush(tipoPratica);

        // Get all the tipoPraticaList
        restTipoPraticaMockMvc.perform(get("/api/tipo-praticas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoPratica.getId().intValue())))
            .andExpect(jsonPath("$.[*].descrizione").value(hasItem(DEFAULT_DESCRIZIONE.toString())))
            .andExpect(jsonPath("$.[*].acronimo").value(hasItem(DEFAULT_ACRONIMO.toString())))
            .andExpect(jsonPath("$.[*].famiglia").value(hasItem(DEFAULT_FAMIGLIA.toString())))
            .andExpect(jsonPath("$.[*].validoAl").value(hasItem(DEFAULT_VALIDO_AL.toString())));
    }

    @Test
    @Transactional
    public void getTipoPratica() throws Exception {
        // Initialize the database
        tipoPraticaRepository.saveAndFlush(tipoPratica);

        // Get the tipoPratica
        restTipoPraticaMockMvc.perform(get("/api/tipo-praticas/{id}", tipoPratica.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoPratica.getId().intValue()))
            .andExpect(jsonPath("$.descrizione").value(DEFAULT_DESCRIZIONE.toString()))
            .andExpect(jsonPath("$.acronimo").value(DEFAULT_ACRONIMO.toString()))
            .andExpect(jsonPath("$.famiglia").value(DEFAULT_FAMIGLIA.toString()))
            .andExpect(jsonPath("$.validoAl").value(DEFAULT_VALIDO_AL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTipoPratica() throws Exception {
        // Get the tipoPratica
        restTipoPraticaMockMvc.perform(get("/api/tipo-praticas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoPratica() throws Exception {
        // Initialize the database
        tipoPraticaRepository.saveAndFlush(tipoPratica);
        int databaseSizeBeforeUpdate = tipoPraticaRepository.findAll().size();

        // Update the tipoPratica
        TipoPratica updatedTipoPratica = tipoPraticaRepository.findOne(tipoPratica.getId());
        // Disconnect from session so that the updates on updatedTipoPratica are not directly saved in db
        em.detach(updatedTipoPratica);
        updatedTipoPratica
            .descrizione(UPDATED_DESCRIZIONE)
            .acronimo(UPDATED_ACRONIMO)
            .famiglia(UPDATED_FAMIGLIA)
            .validoAl(UPDATED_VALIDO_AL);
        TipoPraticaDTO tipoPraticaDTO = tipoPraticaMapper.toDto(updatedTipoPratica);

        restTipoPraticaMockMvc.perform(put("/api/tipo-praticas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoPraticaDTO)))
            .andExpect(status().isOk());

        // Validate the TipoPratica in the database
        List<TipoPratica> tipoPraticaList = tipoPraticaRepository.findAll();
        assertThat(tipoPraticaList).hasSize(databaseSizeBeforeUpdate);
        TipoPratica testTipoPratica = tipoPraticaList.get(tipoPraticaList.size() - 1);
        assertThat(testTipoPratica.getDescrizione()).isEqualTo(UPDATED_DESCRIZIONE);
        assertThat(testTipoPratica.getAcronimo()).isEqualTo(UPDATED_ACRONIMO);
        assertThat(testTipoPratica.getFamiglia()).isEqualTo(UPDATED_FAMIGLIA);
        assertThat(testTipoPratica.getValidoAl()).isEqualTo(UPDATED_VALIDO_AL);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoPratica() throws Exception {
        int databaseSizeBeforeUpdate = tipoPraticaRepository.findAll().size();

        // Create the TipoPratica
        TipoPraticaDTO tipoPraticaDTO = tipoPraticaMapper.toDto(tipoPratica);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTipoPraticaMockMvc.perform(put("/api/tipo-praticas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoPraticaDTO)))
            .andExpect(status().isCreated());

        // Validate the TipoPratica in the database
        List<TipoPratica> tipoPraticaList = tipoPraticaRepository.findAll();
        assertThat(tipoPraticaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTipoPratica() throws Exception {
        // Initialize the database
        tipoPraticaRepository.saveAndFlush(tipoPratica);
        int databaseSizeBeforeDelete = tipoPraticaRepository.findAll().size();

        // Get the tipoPratica
        restTipoPraticaMockMvc.perform(delete("/api/tipo-praticas/{id}", tipoPratica.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TipoPratica> tipoPraticaList = tipoPraticaRepository.findAll();
        assertThat(tipoPraticaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoPratica.class);
        TipoPratica tipoPratica1 = new TipoPratica();
        tipoPratica1.setId(1L);
        TipoPratica tipoPratica2 = new TipoPratica();
        tipoPratica2.setId(tipoPratica1.getId());
        assertThat(tipoPratica1).isEqualTo(tipoPratica2);
        tipoPratica2.setId(2L);
        assertThat(tipoPratica1).isNotEqualTo(tipoPratica2);
        tipoPratica1.setId(null);
        assertThat(tipoPratica1).isNotEqualTo(tipoPratica2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoPraticaDTO.class);
        TipoPraticaDTO tipoPraticaDTO1 = new TipoPraticaDTO();
        tipoPraticaDTO1.setId(1L);
        TipoPraticaDTO tipoPraticaDTO2 = new TipoPraticaDTO();
        assertThat(tipoPraticaDTO1).isNotEqualTo(tipoPraticaDTO2);
        tipoPraticaDTO2.setId(tipoPraticaDTO1.getId());
        assertThat(tipoPraticaDTO1).isEqualTo(tipoPraticaDTO2);
        tipoPraticaDTO2.setId(2L);
        assertThat(tipoPraticaDTO1).isNotEqualTo(tipoPraticaDTO2);
        tipoPraticaDTO1.setId(null);
        assertThat(tipoPraticaDTO1).isNotEqualTo(tipoPraticaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(tipoPraticaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(tipoPraticaMapper.fromId(null)).isNull();
    }
}
