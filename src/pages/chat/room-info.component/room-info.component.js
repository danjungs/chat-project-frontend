import { useNavigate } from 'react-router-dom';
import './room-info.component.scss';
import { useEffect, useState } from 'react';

function RoomInfo({ socket, username, room }) {
  const [chatRoomUsers, setChatRoomUsers] = useState([]);

  useEffect(() => {
    socket.on('chatroom_users', data => {
      console.log(data);
      setChatRoomUsers(data)
    })
    return () => socket.off('chatroom_users');
  }, [socket]);
  const navigate = useNavigate();
  const leaveRoom = ()=> {
    socket.emit('leave_room', {username, room})
    navigate('/', { replace: true});
  }

  return (
    <div className="room-info-container">
      <div className='room-info-container__users'>
        <span className='room-info-container__users-title'>Usuários:</span>
        {chatRoomUsers.map((user, i) => (
          <div className='room-info-container__message-container' key={i}>
            <p className='room-info-container__message-text'>{user.username}</p>
          </div>
        ))}  
      </div>
      <div className='room-info-container__btn-container'>
        <button className='btn' onClick={leaveRoom}>Sair da Sala</button>
      </div>
    </div>
  );
}

export default RoomInfo;




