import React from 'react'
import {socket} from '../App'

const LogIn = ({ isLoggedIn, setIsLoggedIn, username, setUsername, room, setRoom }) => {

  const joinRoom = () => {
      if(username !== "" && room !== ""){
          setIsLoggedIn(!isLoggedIn)
          socket.emit("join_room", room)
      }
  }


  return (
    <>
        <input value={username} type="text" placeholder='Username' onChange={e => setUsername(e.target.value)}/>
        <input value={room} type="text" placeholder='Room' onChange={e => setRoom(e.target.value)}/>
        <button onClick={joinRoom}>Log In</button>
    </>
  )
}

export default LogIn