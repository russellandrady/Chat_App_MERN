import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { MdFace6 } from "react-icons/md";
import "../styles/style_for_chat.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

export default function ChatBox({ chat, setSendMessage, receivedMessage }) {
  const [userData, setUserData] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const scroll = useRef();

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser._id);
    console.log(userId);
    const getUser = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          console.log(userData);
        } else {
          console.log("Failed to get other user data");
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) {
      getUser();
    }
  }, [chat, currentUser]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(`/api/message/${chat._id}`);
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
          console.log(data);
        } else {
          console.log("Failed to get messages");
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) {
      getMessages();
    }
  }, [chat]);

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const message = {
        senderId: currentUser._id,
        text: newMessage,
        chatId: chat._id,
      };
      //send message to socket server
      const receiverId = chat.members.find((id) => id !== currentUser._id);
      setSendMessage({ ...message, receiverId });
      const { response } = await fetch(`/api/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      setMessages([...messages, message]);
      console.log(message);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  

  return (
    <div>
      <div className="ChatBoxContainer">
        {chat ? (
          <div>
            <div className="chat-header">
              <div className="follower">
                <div className="follower conversation">
                  <div>
                    {/* {online && <div className="online-dot"></div>} */}
                    {/*  */}
                    <MdFace6 />

                    <div className="name" style={{ fontSize: "0.8rem" }}>
                      <span>{userData?.username}</span>
                      {/* <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span> */}
                    </div>
                  </div>
                </div>
                <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
              </div>
            </div>
            <div className="chat-body">
              {(Array.isArray(messages) ? messages : []).map((message) => (
                <div
                  ref={scroll}
                  key={message._id}
                  className={
                    message.senderId === currentUser._id
                      ? "message own"
                      : "message"
                  }
                >
                  <span>{message.text}</span>
                  <span>{format(message.createdAt)}</span>
                </div>
              ))}
            </div>
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <button className="send-button button" onClick={handleSend}>
                Send
              </button>
            </div>
          </div>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </div>
  );
}
