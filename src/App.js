import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Home from './pages/home/home';
import Chat from './pages/chat/chat';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  useEffect(() => {
    const data = window.sessionStorage.getItem('USER_STATE');
    if ( data !== null ) {
      const appState = JSON.parse(data);
      setUsername(appState.un)
      setRoom(appState.r)
      socket.emit('join_room', {username: appState.un, room: appState.r, batata: 'teste'})
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={
            <Home 
              username={username}
              setUsername={setUsername}
              room={room}
              setRoom={setRoom}
              socket={socket}
            />
          } />
          <Route path='/chat' element={
            <Chat 
              username={username}
              room={room}
              socket={socket}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
