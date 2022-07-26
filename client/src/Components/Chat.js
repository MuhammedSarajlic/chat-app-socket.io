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
    <div className='chat-position'>
        <div className='chat'>
            <div className='chat-header'>
                <h1>{room}</h1>
            </div>
            <div className='chat-body'>
                {messageList.map((item, index) => (
                    <div key={index} className={item.username === username ? 'user' : 'other'}>
                        <p className='msg-info'>{item.username}</p>
                        <p className={item.username === username ? 'user-msg' : 'other-msg'}>{item.message}</p>
                        <p className='msg-info'>{item.date}</p>
                    </div>
                ))}
            </div>
            <div className='chat-footer'>
                <input value={message} type="text" placeholder='Message...' onChange={e => setMessage(e.target.value)}/>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    </div>
  )
}

export default Chat