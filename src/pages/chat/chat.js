import './chat.scss';
import Messages from './messages.component/messages.component';
import RoomInfo from './room-info.component/room-info.component';
import SendMessage from './send-message.component/send-message.component';

function Chat({ socket, username, room }) {
  return (
    <div className='chat-container'>
      <div className='chat-container__message-header'>
        <h3 className='room-info-container__room'>{room}</h3>
      </div>
      <div className='chat-container__content'>
        <div className="chat-container__content__room-info">
            <RoomInfo socket={socket} username={username} room={room} />
          </div>
        <div className="chat-container__content__chat-content">
          <div className="chat-container__content__messages-content">
            <Messages socket={socket} />
          </div>
          <div className="chat-container__content__send-message-content">
            <SendMessage socket={socket} username={username} room={room} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;




