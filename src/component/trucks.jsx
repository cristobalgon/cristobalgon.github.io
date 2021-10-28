import React, { useEffect, useState } from 'react';
//import { Button, Modal } from 'react-bootstrap';
import socket from '../socket/socket';

export default function Trucks() {

    const [trucks, setTrucks] = useState([]);

    useEffect(() => {

        socket.emit("TRUCKS");
        socket.on("TRUCKS", (data) => {
            let camiones = [];
            data.forEach((camion) => {
                const uno = {
                    capacity: camion.capacity, 
                    code: camion.code,
                    destination: [camion.destination[0], camion.destination[1]],
                    engine: camion.engine,
                    origin: [camion.origin[0], camion.origin[1]],
                    staffs: camion.staff,
                    truck: camion.truck,
                    status: 'OK',
                }
                camiones.push(uno);
            })
            setTrucks(data);
            console.log("set trucks", data);
        })
    }, []);

    return (      
        <div>
            <table>
                <tr>
                    <th>Camión</th>
                    <th>Origen</th>
                    <th>Destino</th>
                    <th>Estado</th>
                    <th></th>
                </tr>
                {trucks.map((truck) => {
                    <tr>
                        <th>{truck.code}</th>
                        <th>{truck.origin}</th>
                        <th>{truck.destination}</th>
                        <th>{truck.status}</th>
                    </tr>
                    if(truck.status !== "OK") {
                        <button onClick={() => socket.emit("FIX", {code: truck.code})}> Fix it  </button>
                    }
                })}
            </table>

        </div>
    )

}