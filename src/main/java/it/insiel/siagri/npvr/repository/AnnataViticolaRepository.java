package it.insiel.siagri.npvr.repository;

import it.insiel.siagri.npvr.domain.AnnataViticola;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AnnataViticola entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnnataViticolaRepository extends JpaRepository<AnnataViticola, Long> {

}
