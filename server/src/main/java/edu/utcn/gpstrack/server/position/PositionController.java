package edu.utcn.gpstrack.server.position;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * @author Radu Miron
 * @version 1
 */
/*
CONTROLLERUL SE OCUPA DE CREAREA DE ENDPOINTURI
ENDPOINTURILE SUNT APELATE ORI DIN FRONTEND, ORI DIN POSTMAN(PENTRU TESTARE)
TOT CE FAC FUNCTIILE DIN CONTROLLER E SA IA DATELE DIN FRONTEND, SA LE PASEZE LA SERVICE SI INVERS
 */
@RestController
@RequestMapping("/positions")
public class PositionController {

    @Autowired
    private PositionService positionService;

    //ENDPOINT DE POST
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/position", method = RequestMethod.POST)
    public Position create(@RequestBody Position position) {
        return positionService.create(position);
    }

    //ENDPOINT DE GET
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/position/{id}", method = RequestMethod.GET)
    public Position getById(@PathVariable(name="id") String id) {
        return positionService.getById(id);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/position/{startDate}/{endDate}", method = RequestMethod.GET)
    public  List<Position> getById(@PathVariable("startDate") String startDate, @PathVariable("endDate") String endDate) {
        Calendar cal1 = Calendar.getInstance();
        Calendar cal2 = Calendar.getInstance();
        cal1.setTimeInMillis(Long.parseLong(startDate));
        cal2.setTimeInMillis(Long.parseLong(endDate));
        return positionService.getByDate(cal1.getTime(), cal2.getTime());
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/positions", method = RequestMethod.GET)
    public List<Position> getAll() {
        return positionService.getAll();
    }

    //ENDPOINT DE PUT (UPDATE)
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/position/{id}", method = RequestMethod.PUT)
    public Position update(@PathVariable("id") long id, Position model) {
        return positionService.update(id, model);
    }

    //ENDPOINT DE DELETE
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/position/{id}", method = RequestMethod.DELETE)
    public Integer delete(@PathVariable("id") long id) {
        return positionService.delete(id);
    }

}
