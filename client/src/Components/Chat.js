import React, {useState} from 'react'

const Chat = () => {
    const [message, setMessage] = useState("")

    // const sendMessage = () => {
    // }

  return (
    <>
        <input value={message} type="text" placeholder='Message...' onChange={e => setMessage(e.target.value)}/>
        <button onClick={sendMessage}>Send</button>
    </>
  )
}

export default Chat