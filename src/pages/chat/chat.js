import './chat.scss';
import Messages from './messages.component/messages.component';
import SendMessage from './send-message.component/send-message.component';

function Chat({ socket, username, room }) {
  return (
    <div className="chat-container">
      <div className="chat-container__messages-content">
        <Messages socket={socket} />
      </div>
      <div className="chat-container__send-message-content">
        <SendMessage socket={socket} username={username} room={room}/>
      </div>
    </div>
  );
}

export default Chat;




