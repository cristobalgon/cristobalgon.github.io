import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from 'react-leaflet'
import socket from '../socket/socket';
import 'leaflet/dist/leaflet.css';

export default function Map() {
    const [positions, setPositions] = useState({});
    const [trucks, setTrucks] = useState([]);

    useEffect(() => {

        socket.emit("TRUCKS");
        socket.on("TRUCKS", (data) => {
            setTrucks(data);
        })
    }, []);

    useEffect(() => {
        socket.emit("TRUCKS");
        socket.on("POSITION", (data) => {
            const newPositions = positions;
            setPositions({});
            newPositions[data.code] = data.position;
            setPositions(newPositions);
        })
    })

    const viewDetails = (truck) => {
        for (let i=0; i < trucks.length; i++)
        {
          if (trucks[i].code === truck)
          {
            alert(JSON.stringify(trucks[i]));
          }
        }
      }

    const fixing = (truck) => {
        socket.emit('FIX', {code: truck});
    }

    return (
        <div>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
            <script src="../dist/leaflet.polylineDecorator.js" />
            <h2>Mapa</h2>
            <MapContainer center={[-22, -68.8]} zoom={10} scrollWheelZoom={true} style={{height: '400px', width: '700px'}}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {
                  trucks && (
                    <>
                    {trucks.map((one) => (
                        <Polyline color='green' key={one.code} positions={[one.origin, one.destination]} />
                    ))}
                    </>
                  )
                }
                {
                  positions !== {} && (
                      Object.keys(positions).map((pos) => (
                        <Marker key={pos} position={positions[pos]}>
                            <Tooltip>
                            {pos}
                            </Tooltip>
                        </Marker> 
                      )
                  ))
                }
                  
            </MapContainer>
            
            <h1>Camiones</h1>
                <div>
                    {
                    trucks.map((truck) => (
                        <div className={truck.status === "OK" ? "cardGreen" : "cardRed"} >
                        <h4>Camión: {truck.code}</h4>
                        <h4>Origen: {truck.origin}</h4>
                        <h4>Destino: {truck.destination}</h4>
                        <h4>Estado: {truck.status}</h4>
                        <div className="buttons">
                            <button onClick={() => { viewDetails(truck.code); }}>Ver Detalles</button>
                            {truck.status === 'OK' ? null : <button onClick={() => { fixing(truck.code); }} >Arreglar</button>}
                            
                        </div>
                        </div>
                    ))
                    }
                </div>
        </div>

    )
}