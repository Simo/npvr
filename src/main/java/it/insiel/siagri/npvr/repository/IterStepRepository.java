package it.insiel.siagri.npvr.repository;

import it.insiel.siagri.npvr.domain.IterStep;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the IterStep entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IterStepRepository extends JpaRepository<IterStep, Long> {

}
