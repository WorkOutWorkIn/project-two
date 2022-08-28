import React from 'react';
import { useNavigate } from 'react-router-dom'
import "./UserDetails.css"

const UserDetails = (props) => {
  const navigate = useNavigate()
  return (
    <div className="chatContainer flex_center">
      {
        props.finalChatsInfo !== [] && props.finalChatsInfo.length >= 1 ?
          props.finalChatsInfo.map(chat =>
            <div key={chat.chatID} className="individualChatContainer">
              <div>
                {chat.usersInfo.name}
              </div>
              <div>
                <img src={chat.usersInfo.image[0]} alt={`${chat.usersInfo.name}'s 1st uploaded image`} />
              </div>
              <div>
                <button onClick={() => navigate(`/${chat.chatID}`)}>Go there</button>
              </div>
            </div>

          )
          : null
      }

    </div>
  );
};

export default UserDetails;
