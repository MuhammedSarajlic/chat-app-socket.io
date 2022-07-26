import React, {useEffect, useState} from 'react'
import {socket} from '../App'

const Chat = ({ username, room }) => {
    const [message, setMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        let hours = new Date().getHours() < 10 ? "0" + new Date().getHours() : new Date().getHours()
        let minutes = new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes()
        const msgBody = {
            message: message,
            username: username,
            room: room,
            date: `${hours}:${minutes}`
        }
        await socket.emit("send_msg", msgBody)
        setMessageList((list) => [...list, msgBody])
        setMessage("")
    }

    useEffect(() => {
        socket.on("receive_msg", (data) => {
            setMessageList((list) => [...list, data])
        })
    }, [])


  return (
    <>
        {messageList.map((item, index) => (
            <div key={index}>
                <p>{item.message}</p>
                <p>{item.username}</p>
                <p>{item.date}</p>
            </div>
        ))}
        <input value={message} type="text" placeholder='Message...' onChange={e => setMessage(e.target.value)}/>
        <button onClick={sendMessage}>Send</button>
    </>
  )
}

export default Chat