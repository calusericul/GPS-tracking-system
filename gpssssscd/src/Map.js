import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const containerStyle = {
  width: '1500px',
  height: '700px'
};

const center = {
  lat: 46.770439,
  lng: 23.591423
};

// let mapMarkers = [{ id: 111, latitude: 46.770439, longitude: 23.591423 }];


export class Map extends React.Component {

  constructor() {
    this.state = {
      mapMarkers:  [{ id: 111, latitude: 46.770439, longitude: 23.591423 }]
    }
  }


  static addMarker(marker) {
    this.setState({
      mapMarkers: this.state.mapMarkers.push(marker)
    })
  }

  render() {

    return (
      <LoadScript
        googleMapsApiKey="AIzaSyA4T2YOjrhq6Lwb6BP2zVmHl1qD-O2eDgg"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          places
        >
          {this.state.mapMarkers && this.state.mapMarkers.map((place) => {
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
    )
  }
}

export default React.memo(Map)