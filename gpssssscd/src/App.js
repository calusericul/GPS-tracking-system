import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Map from './Map';
import 'react-datepicker/dist/react-datepicker.css'
import DateTimePicker from 'react-datetime-picker'
import axios from 'axios';

const containerStyle = {
  width: '1500px',
  height: '700px'
};

const center = {
  lat: 46.770439,
  lng: 23.591423
};


function App() {
  const postUrl = "http://localhost:8081/positions/position";
  const getByIdUrl = "http://localhost:8081/positions/position/";
  const getAllUrl = "http://localhost:8081/positions/positions/";

  const [value, onChange] = useState(new Date());
  const [value1, onChange1] = useState(new Date());

  const [data, setData] = useState({
    latitude: "",
    longitude: "",
    terminal_id: "",
    idToGet: "",
    idToDelete: "",
    startDate: "",
    startDateToSend: "",
    endDateToSend: "",
    markers: []
  });

  function submit(e) {
    e.preventDefault();
    axios.post(postUrl, {
      latitude: data.latitude,
      longitude: data.longitude,
      terminal_id: data.terminal_id
    })
      .then(res => {
        console.log(res.data);
      });
  }

  function getById(e) {
    e.preventDefault();
    axios.get(`http://localhost:8081/positions/position/${data.idToGet}`)
      .then(res => {
        const newdata = { ...data };
        newdata.markers = [{ id: res.data.id, latitude: parseFloat(res.data.latitude), longitude: parseFloat(res.data.longitude) }];
        setData(newdata);
      })
      .catch(error => {
        console.log(error);
      })
  }

  function deleteById(e) {
    e.preventDefault();
    axios.delete(`http://localhost:8081/positions/position/${data.idToDelete}`)
      .then(res => {
        console.log(res.data);
        const newdata = { ...data };
        newdata.markers = newdata.markers.filter(marker => marker.id != data.idToDelete);
        setData(newdata);
        data.idToDelete = "";
      })
      .catch(error => {
        console.log(error);
      })
  }

  function getByDate(e) {
    e.preventDefault();
    axios.get(`http://localhost:8081/positions/position/${data.startDateToSend}/${data.endDateToSend}`)
      .then(res => {
        // console.log(res.data);
        const newdata = { ...data };
        newdata.markers = new Array();
        res.data.forEach((marker, index) => {
          if (marker) {
            newdata.markers.push({
              id: marker.id,
              latitude: parseFloat(marker.latitude),
              longitude: parseFloat(marker.longitude)
            });
          }
        }
        )
        console.log(newdata.markers);
        setData(newdata);
      })
      .catch(error => {
        console.log(error);
      })
  }

  function getAll(e) {
    e.preventDefault();
    axios.get(getAllUrl)
      .then(res =>
        res.data.forEach(position => {
          const newdata = { ...data };
          const index = newdata.markers.findIndex(object => object.id === position.id);
          if (index === -1) {
            newdata.markers.push({ id: position.id, latitude: parseFloat(position.latitude), longitude: parseFloat(position.longitude) });
          }
          setData(newdata);
        }))
      .catch(error => {
        console.log(error);
      })
  }

  function handle(e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata);
  }

  function handleStartDate(date) {
    const newdata = { ...data }
    newdata.startDate = new Date(date);
    newdata.startDateToSend = date.getTime();
    setData(newdata);
  }

  function handleEndDate(date) {
    const newdata = { ...data }
    newdata.endDate = new Date(date);
    newdata.endDateToSend = date.getTime();
    setData(newdata);
  }


  return (
    <div className="App" style={{

      backgroundColor: 'lightgreen'
    }}>
      <Navbar bg="info" variant="dark" sticky='top' expand="lg">
        <Navbar.Brand>
          <a href='#home'>
            <img src={logo} width="40px" height="40px" />{''}
            CLICK TO SEE THE MAP
          </a>
        </Navbar.Brand>

        <Navbar.Toggle className='coloring' />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="#getid">GETID</Nav.Link>
            <Nav.Link href="#getdate">GETDATE</Nav.Link>
            <Nav.Link href="#deleteid">DELETEID</Nav.Link>
            <Nav.Link href="#put">PUT</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className='content' style={{ display: 'flex', justifyContent: 'center' }}  >
        <a className="anchor" id="home"></a>

        {/* <Map></Map> */}
        <LoadScript
          googleMapsApiKey="AIzaSyA4T2YOjrhq6Lwb6BP2zVmHl1qD-O2eDgg"
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            places
          >
            {data.markers && data.markers.map((place) => {
              let lat = place.latitude;
              let lng = place.longitude;

              return (
                <Marker
                  id={place.id}
                  key={place.id}
                  position={{ lat: lat, lng: lng }}
                >
                </Marker>
              );
            })}
          </GoogleMap>
        </LoadScript>
        <hr />
        <form onSubmit={(e) => getAll(e)}>
          <label>
            Get all markers :
          </label>
          <input type="submit" value="Get All" />
        </form>

      </div>
      <div className='content' style={{ justifyContent: 'center' }} >
        <a className="anchor" id="getid" ></a>
        This is the official page to get a marker on the map by ID.
        <hr />
        <form onSubmit={(e) => getById(e)}>
          <label>
            Introduce ID:
            <input onChange={(e) => handle(e)} id="idToGet" value={data.idToGet} type="text" name="idToGet" />
          </label>
          <input type="submit" value="Get Id" />
        </form>

      </div>
      <div className='content' >
        <form onSubmit={(e) => getByDate(e)}>
          <a className="anchor" id="getdate"></a>
          Select Start Date of the period where u want to see the marks.
          <DateTimePicker
            onChange={(e) => handleStartDate(e)}
            id="startDate"
            selected={data.startDate}
            value={data.startDate}
            disableClock={true}
            isClockOpen={true}
            disableClock={true}
          />
          <hr />
          Select End Date of the period where u want to see the marks.

          <DateTimePicker
            onChange={(e) => handleEndDate(e)}
            id="endDate"
            selected={data.endDate}
            value={data.endDate}
            disableClock={true}
            isClockOpen={true}
            disableClock={true}
          />
          <hr />
          <label>
            When both dates are selected press the button:
          </label>
          <input type="submit" value="Get Date" />
        </form>

      </div>
      <div className='content' >
        <a className="anchor" id="deleteid"></a>
        I will have a button for deleteid.
        <form onSubmit={(e) => deleteById(e)}>
          <label>
            Introduce the ID of the marker you want to delete :
            <input onChange={(e) => handle(e)} id="idToDelete" value={data.idToDelete} type="text" name="idToDelete" />
          </label>
          <input type="submit" value="Delete by ID" />
        </form>

      </div>


      <div className='content' >
        <a className="anchor" id="put"></a>


        <form onSubmit={(e) => submit(e)}>
          <label>
            Introduce latitude of the marker you want to create:
            <input onChange={(e) => handle(e)} id="latitude" value={data.latitude} type="text" name="latitude" />
          </label>

          <label>
            Introduce longitude of the marker you want to create:
            <input onChange={(e) => handle(e)} id="longitude" value={data.longitude} type="text" name="longitude" />
          </label>

          <hr />

          <input type="submit" value="Submit Marker Creation" />
        </form>
        <hr />



      </div>
    </div>
  );
}

export default App;
