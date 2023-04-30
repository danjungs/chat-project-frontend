
import './send-message.component.scss';
import { useState } from 'react';

function SendMessage({ socket, username, room }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  }

  const sendMessage = () => {
    if (message === '') {
      return;
    }
    const createdTime = Date.now()
    const messageObj = {username, message, room, createdTime};
    console.log(messageObj)
    socket.emit('send_message', messageObj)
    setMessage('');
  }

  return (
    <div className="send-message-container">
      <form onSubmit={handleSubmit}>
        <input className="input" onChange={(e)=> setMessage(e.target.value)} value={message} placeholder={'Conversar em ' + room}/>
        <button className='btn btn-secondary' type="submit">{'>'}</button>
      </form>
    </div>
  );
}

export default SendMessage;




