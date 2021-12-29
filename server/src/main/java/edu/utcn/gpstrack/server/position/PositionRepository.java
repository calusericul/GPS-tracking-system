package edu.utcn.gpstrack.server.position;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Radu Miron
 * @version 1
 */
public interface PositionRepository extends JpaRepository<Position, Integer> {

}
