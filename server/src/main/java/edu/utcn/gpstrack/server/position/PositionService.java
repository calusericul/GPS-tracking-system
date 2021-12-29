package edu.utcn.gpstrack.server.position;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Radu Miron
 * @version 1
 */
//FUNCTIILE DIN SERVICE PRIMESC DIN CONTROLLER DIFERITE DATE SI SE OCUPA CU PROCESAREA DATELOR DIN REPOSITORY SI TRIMITE INAPOI LA CONTROLLER
@Service
public class PositionService {

    @Autowired
    private PositionRepository positionRepository;

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Position create(Position position) {
        return positionRepository.save(position);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Position getById(String id) {
        return positionRepository.findById(Integer.parseInt(id)).get();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<Position> getAll() {
        return positionRepository.findAll();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Position update(long id, Position newPosition) {
        return positionRepository.save(newPosition);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Integer delete(long id) {
        positionRepository.deleteById((int) id);
        return 1;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<Position> getByDate(Date startDate, Date endDate) {
        return positionRepository.findAll()
                .stream()
                .map(position -> {
                    Date creationDate = position.getCreationDate();
                    if (creationDate.after(startDate) && creationDate.before(endDate))
                        return position;
                    return null;
                })
                .collect(Collectors.toList());
    }

}
