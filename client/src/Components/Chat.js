import React, {useEffect, useState} from 'react'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001")

const Chat = () => {
    const [message, setMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    const sendMessage = () => {
        socket.emit("send_msg", {message})
        setMessageList((list) => [...list, message])
        setMessage("")
    }

    useEffect(() => {
        socket.on("receive_msg", (data) => {
            setMessageList((list) => [...list, data])
        })
    }, [socket])

    console.log(messageList);
  return (
    <>
        <input value={message} type="text" placeholder='Message...' onChange={e => setMessage(e.target.value)}/>
        <button onClick={sendMessage}>Send</button>
    </>
  )
}

export default Chat