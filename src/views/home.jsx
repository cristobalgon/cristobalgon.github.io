import React from 'react';
import Chat from '../component/chat'
import Map from '../component/map'
export default function Home() {

    
  return (
    <div>
      <div class="home">
        <h1>Bienvenido a la Tarea 3!</h1>
      </div>
      <div>
        <Map/>
      </div>
      <div>
        <Chat/>
      </div>
      
    </div>
  );
}