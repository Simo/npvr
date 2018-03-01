package it.insiel.siagri.npvr.repository;

import it.insiel.siagri.npvr.domain.StatoPratica;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the StatoPratica entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StatoPraticaRepository extends JpaRepository<StatoPratica, Long> {

}
