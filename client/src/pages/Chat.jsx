import { useEffect, useRef, useState } from 'react'
import "../styles/style_for_chat.css";
import { chatGotAll, chatGotAllFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Conversation from '../components/Conversation';
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatBox from '../components/ChatBox';
import { io } from "socket.io-client";

export default function Chat() {
    const [currentChat, setCurrentChat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const { currentUser, chats, loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    console.log(chats);

    const socket = useRef();

    useEffect(() => {
      socket.current = io("http://localhost:8800");
      socket.current.emit("new-user-add", currentUser._id);
      socket.current.on("get-users", (users) => {
        setOnlineUsers(users);
      });
    }, [currentUser]);

    //sending message to socket server

    useEffect(() => {
        if (sendMessage!==null) {
          socket.current.emit("send-message", sendMessage);}
      }, [sendMessage]);

    //receiving message from socket server
    useEffect(() => {
        socket.current.on("recieve-message", (data) => {
          setReceivedMessage(data);
        });
      }, []);

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

          fetchData();
          console.log("fetched");
        
      }, []);
      const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== currentUser._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
      };
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
                  online={checkOnlineStatus(chat)}
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
        setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  )
}
