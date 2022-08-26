import React from 'react';
import { Link } from 'react-router-dom'

const UserDetails = (props) => {
  return (
    <div>
      {
        props.finalChatsInfo !== [] && props.finalChatsInfo.length >= 1 ?
          props.finalChatsInfo.map(chat =>
            <div key={chat.chatID}>
              {chat.chatID}<br />
              {chat.usersInfo.uid}<br />
              {chat.usersInfo.image[0]}<br />
              {chat.usersInfo.funfact}       <br />
              <button className="button"><Link to={`/${chat.chatID}`}>Go there</Link></button>
            </div>
          )
          : null
      }

    </div>
  );
};

export default UserDetails;

