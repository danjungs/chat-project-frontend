import { useNavigate } from 'react-router-dom';
import './home.scss';

function Home({ username, setUsername, room, setRoom, socket}) {
  const navigate = useNavigate();
  const joinRoom = () => {
    if (room === '' || username === '') {
      return;
    }
    socket.emit('join_room', {username, room})
    window.sessionStorage.setItem('USER_STATE', JSON.stringify({un: username, r: room}))
    navigate('/chat', { replace: true});
  }

  return (
    <div className="home-container">
      <div className="form-Container">
        <h1>Chat Project!</h1>
        <div className="form-content">
          <label for="username">Nome:</label>
          <input  id="username" className="input" onChange={(e)=> setUsername(e.target.value)}/>
        </div>
        <div className="form-content">
          <label for="room">Sala:</label>
          <input  id="room" className="input" onChange={(e)=> setRoom(e.target.value)}/>
        </div>
        <div className="button-content">
          <button className='btn btn-secondary' onClick={joinRoom}>Entrar na sala</button>
        </div>
      </div>    
    </div>
  );
}

export default Home;




