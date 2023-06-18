import React, { useEffect, useState } from "react";

function Chat({ server, userName, room }) {
    const [currentMessage,setCurrentMessage] = useState('')
    const [messageList, setMessageList] = useState([]);
   const sendMessage = async()=>{
    if(currentMessage !== ""){
        const messageData = {
          room : room,
          author: userName,
          message: currentMessage,
          time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
        }
        await server.emit("send_message", messageData)
        // setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
   }
   
   useEffect(()=>{
   server.on("receive_message", (data)=>{
    console.log("data", data);
    // setMessageList((list) => [...list, data]);
   })
   },[server])
//    console.log("messageList", messageList);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {messageList.map((messageContent)=>{
            return (
                <h1>{messageContent.message}</h1>
            )
        })}
      </div>
      <div className="chat-footer">
        <input text="text" placeholder="Hey...." value={currentMessage} onChange={(e)=>setCurrentMessage(e.target.value)}/>
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
