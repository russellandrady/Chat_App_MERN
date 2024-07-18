import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdFace6 } from "react-icons/md";
import "../styles/style_for_chat.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

export default function ChatBox({ chat }) {
  const [userData, setUserData] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

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

  return (
    <div>
      <div className="ChatBoxContainer">
        {chat?
        <div>
        <div className="chat-header">
          <div className="follower">
            <div className="follower conversation">
              <div>
                {/* {online && <div className="online-dot"></div>} */}
                {/* <img
            src={userData?.profilePicture? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"}
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          /> */}
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
              key={message._id}
              className={
                message.senderId === currentUser ? "message own" : "message"
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
          <button className="send-button button" >Send</button>
        </div>
      </div>:<span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
      }
      </div>
    </div>
  );
}
