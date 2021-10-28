import React, { useEffect, useState, useRef } from 'react';
import socket from '../socket/socket';

export default function Chat() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [name, setName] = useState("");
    const [registrated, setRegistrated] = useState(false);

    useEffect(() => {
        socket.on("CHAT", all => {
            setChat([...chat, all])
        })

        return () => {socket.off()}
    })

    const register = (e) => {
        e.preventDefault();
        if(name !== ""){
            setRegistrated(true)
        }
    }

    const submit = (e) => {
        e.preventDefault();
        socket.emit("CHAT", {name: name, message: message});
        setMessage("");
    };

    const divRef = useRef(null);
    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: "smooth" });
    });


    return (
        <div>
            <div className="chat">
                {chat.map((e, i) => <div key={i}> <div> {e.name} {Date(Date.UTC(e.date))} </div> <div> {e.message} </div> </div>)}
            </div>
            <div ref={divRef}> </div>
            

            {!registrated &&
            <form onSubmit={register}>
                <label> Debe registrarse... </label>
                <input value={name} placeholder="Escribe su nombre" onChange={e => setName(e.target.value)}/>
                <button> Quiero escribir! </button>
            </form>
            }

            {registrated && 
            <form onSubmit={submit}>
                <textarea name="" id="" cols="50" rows="1" value={message} placeholder="Escribe su mensaje" onChange={(e) => setMessage(e.target.value)}> </textarea>
                <button> Enviar </button>
            </form>
            }           
        </div>
    )
}

// para el chat, utilicé un video de youtube, dejo el link:
// https://www.youtube.com/watch?v=mEr9lt5mG9A