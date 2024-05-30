import './App.css'

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Map from './Map';

const socket = io('http://54.164.167.42:4000');

function App() {
  const [positions, setPositions] = useState([]);


  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');

      // Enviar la ubicación inicial del usuario
      navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('location', {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        console.log({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      });

      // Actualizar la ubicación del usuario en tiempo real
      navigator.geolocation.watchPosition((position) => {
        socket.emit('location', {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    });

    socket.on('updateLocations', (locations) => {
      setPositions(locations);
    });

    return () => {
      socket.off('connect');
      socket.off('updateLocations');
    };
  }, []);

  return (
    <>
      <Map positions={positions} />
    </>
  )
}

export default App
