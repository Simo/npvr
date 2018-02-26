package it.insiel.siagri.npvr.repository;

import it.insiel.siagri.npvr.domain.Pratica;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Pratica entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PraticaRepository extends JpaRepository<Pratica, Long> {

}
