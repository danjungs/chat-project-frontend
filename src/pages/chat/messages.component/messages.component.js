import './messages.component.scss';
import { useEffect, useState } from 'react';

function Messages({ socket }) {
  const [messagesRecieved, setMessagesRecieved] = useState([]);

  useEffect(() => {
    socket.on('receive_message', data => {
       setMessagesRecieved(state => [
        ...state,
        data
      ])
    })
    return () => socket.off('receive_message');
  }, [socket]);

  const formatDate = (ts) => {
    const date = new Date(ts)
    return date.toLocaleString();
  }

  return (
    <div className="messages-container">
      {messagesRecieved.map((msg, i) => (
        <div className='messages-container__message-container' key={i}>
           <div className='messages-container__message-header'>
            <span className='messages-container__message-user'>{msg.username}</span>
            <span className='messages-container__message-date'>{formatDate(msg.createdTime)}</span>
           </div>
           <p className='messages-container__message-text'>{msg.message}</p>
        </div>
      ))}  
    </div>
  );
}

export default Messages;




