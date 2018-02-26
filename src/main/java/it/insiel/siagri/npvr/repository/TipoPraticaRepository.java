package it.insiel.siagri.npvr.repository;

import it.insiel.siagri.npvr.domain.TipoPratica;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TipoPratica entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoPraticaRepository extends JpaRepository<TipoPratica, Long> {

}
