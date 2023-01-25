import './App.css';
import io from 'socket.io-client'
import {useState} from 'react';
import Chat from './Components/Chat';
import LogIn from './Components/LogIn';

export const socket = io("http://localhost:3001")

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")

  return (
    <div className='container'>
      {isLoggedIn ? 
      <Chat 
        username={username}
        room={room}
      /> 
      : 
      <LogIn 
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        username={username} 
        setUsername={setUsername}
        room={room}
        setRoom={setRoom}
      />
      }
    </div>
  );
}

export default App;
