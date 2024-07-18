import { useEffect, useState } from 'react'
import "../styles/style_for_chat.css";
import { chatGotAll, chatGotAllFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Conversation from '../components/Conversation';
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatBox from '../components/ChatBox';

export default function Chat() {
    const [currentChat, setCurrentChat] = useState(null);
    const { currentUser, chats, loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    console.log(chats);

    const fetchData = async () => {
        try {
          const response = await fetch(`/api/chat/${currentUser._id}`);
          if (response.ok) {
            const data = await response.json();
            dispatch(chatGotAll(data));
            
          } else {
            dispatch(chatGotAllFailure("Failed to fetch data"));
            toast.error("Failed to fetch data");
          }
        } catch (error) {
          dispatch(chatGotAllFailure(error));
          toast.error(error);
        }
      };

    useEffect(() => {
        if ((Array.isArray(chats))) {
          fetchData();
          console.log("fetched");
        }
      }, []);
  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
          {(Array.isArray(chats) ? chats : []).map((chat) => (
              <div
              key={chat._id}
                onClick={() => {
                setCurrentChat(chat);
                }}
                
              >
                <Conversation
                  data={chat}
                //   online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          {/* <NavIcons /> */}
        </div>
        <ChatBox
          chat={currentChat}
        //   setSendMessage={setSendMessage}
        //   receivedMessage={receivedMessage}
        />
      </div>
    </div>
  )
}
