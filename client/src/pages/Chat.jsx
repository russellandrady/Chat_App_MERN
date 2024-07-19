import { useEffect, useRef, useState } from "react";
import "../styles/style_for_chat.css";
import {
  chatGotAll,
  chatGotAllFailure,
  usersGotAll,
  usersGotAllFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Conversation from "../components/Conversation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatBox from "../components/ChatBox";
import { io } from "socket.io-client";

export default function Chat() {
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [availableUsers, setAvailableUsers] = useState([]);
  const { currentUser, chats, loading, users } = useSelector(
    (state) => state.user
  );
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
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
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
  const fetchusers = async () => {
    try {
      const response = await fetch(`/api/user/all-users/${currentUser._id}`);
      if (response.ok) {
        const data = await response.json();
        dispatch(usersGotAll(data));
        console.log(data);
      } else {
        dispatch(usersGotAllFailure("Failed to fetch data"));
        toast.error("Failed to fetch data");
      }
    } catch (error) {
      dispatch(usersGotAllFailure(error));
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchusers();
  }, []);
  useEffect(() => {
    const chatMemberIds = new Set(chats.flatMap((chat) => chat.members));
    const usersNotInChats = users.filter(
      (user) => !chatMemberIds.has(user._id) && user._id !== currentUser._id
    );
    setAvailableUsers(usersNotInChats);
  }, [users, chats, currentUser]);
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find(
      (member) => member !== currentUser._id
    );
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };
  const startChatWithUser = async (userId) => {
    try {
      const response = await fetch(`/api/chat/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: currentUser._id,
          receiverId: userId,
        }),
      });
      const data = await response.json();
      setCurrentChat(data);
      fetchData();
    } catch (error) {
      toast.error(error);
    }
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
                <Conversation data={chat} online={checkOnlineStatus(chat)} />
              </div>
            ))}
          </div>
          <div className="User-selection">
            <h2>Select a user to chat with</h2>
            <ul>
              {availableUsers.map((user) => (
                <button
                  key={user._id}
                  onClick={() => startChatWithUser(user._id)}
                >
                  {user.username}
                </button>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          {/* <NavIcons /> */}
        </div>
        {currentChat && (
          <ChatBox
            chat={currentChat}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
          />
        )}
      </div>
    </div>
  );
}
