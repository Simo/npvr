package it.insiel.siagri.npvr.repository;

import it.insiel.siagri.npvr.domain.Stato;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Stato entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StatoRepository extends JpaRepository<Stato, Long> {

}
