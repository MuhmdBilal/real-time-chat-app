import react, { useState } from "react"
import './App.css';
import io from "socket.io-client"
import Chat from "./Chat";

const server = io.connect("http://localhost:8000")
function App() {
  const [userName, setUserName] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false);
  const joinRoom = ()=>{
    if(userName !== "" && room !== ""){
      server.emit("join_room", room)
      setShowChat(true);
    }
  }
  return (
    <div className="App">
      {!showChat ? (
       <div className="joinChatContainer">
      <h3>Join A Chat</h3>
      <input type="text" placeholder="john..." value={userName} onChange={(e)=>setUserName(e.target.value)}/>
      <input type="text" placeholder="Room ID..." value={room} onChange={(e)=>setRoom(e.target.value)}/>
      <button onClick={joinRoom}> Join A Room</button>
      </div>
      ):(
      <Chat server={server} userName={userName} room={room}/>
      )}
    </div>
  );
}

export default App;
