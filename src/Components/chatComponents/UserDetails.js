import React from 'react';
import { useNavigate } from 'react-router-dom'
import "./UserDetails.css"

const UserDetails = (props) => {
  const navigate = useNavigate()
  return (
    <div className="chatContainer">
      {
        props.finalChatsInfo !== [] && props.finalChatsInfo.length >= 1 ?
          props.finalChatsInfo.map(chat =>
            <div key={chat.chatID} className="individualChatContainer" >
              <div className="chatOverlay"></div>
              <div className="userImageContainer"><img className="userDetails__picture" src={chat.usersInfo.image[0]} alt={`${chat.usersInfo.name}`} /></div>


              <div className="buttonContainer">
                <button className="userDetails__button" onClick={() => navigate(`/${chat.chatID}`)}>Chat with {chat.usersInfo.name}</button>
              </div>


              <div>{chat.usersInfo.name}</div>
            </div>
          )
          : null
      }

    </div>




  );
};

export default UserDetails;

      // <div className="chatContainer flex_center">
      //   {
      //     props.finalChatsInfo !== [] && props.finalChatsInfo.length >= 1 ?
      //       props.finalChatsInfo.map(chat =>
      //         <div key={chat.chatID} className="individualChatContainer flex">
      //           <div>
      //             <div className="userDetails__username-container">
      //               {chat.usersInfo.name}
      //             </div>
      //             <div className="userDetails__picture-container flex_center">
      //               <img className="userDetails__picture" src={chat.usersInfo.image[0]} alt={`${chat.usersInfo.name}'s 1st uploaded image`} />
      //             </div>
                  // <div className="userDetails__button-container">
                  //   <button className="userDetails__button" onClick={() => navigate(`/${chat.chatID}`)}>Go there</button>
                  // </div>
      //           </div>

      //         </div>

      //       )
      //       : null
      //   }

      // </div>