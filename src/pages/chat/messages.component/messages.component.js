import './messages.component.scss';
import { useEffect, useState } from 'react';

function Messages({ socket }) {
  const [messagesRecieved, setMessagesRecieved] = useState([]);

  useEffect(() => {
    const data = window.sessionStorage.getItem('MSG_STATE');
    if ( data !== null ) {
      const appState = JSON.parse(data);
      setMessagesRecieved(appState.m)
    };
  }, []);

  useEffect(() => {
    socket.on('receive_message', data => {
       setMessagesRecieved(state => [
        ...state,
        data
      ])
      window.sessionStorage.setItem('MSG_STATE', JSON.stringify({m: messagesRecieved}))
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
        msg.bot ?
          <div className='messages-container__message-container' key={i}>
            <p className='messages-container__bot-text'>- {msg.message} -</p>
          </div>
          :
          <div className='messages-container__message-container' key={i}>
            <div className='messages-container__message-header'>
              { msg.username && <span className='messages-container__message-user'>{msg.username}</span>}
              { msg.createdTime && <span className='messages-container__message-date'>{formatDate(msg.createdTime)}</span>}
            </div>
            <p className='messages-container__message-text'>{msg.message}</p>
          </div>
      ))}  
    </div>
  );
}

export default Messages;




