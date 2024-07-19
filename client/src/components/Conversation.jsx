
import { useEffect, useState } from "react";
import { MdFace6 } from "react-icons/md";
import { useSelector } from "react-redux";

const Conversation = ({data, online}) => {

    const [userData, setUserData] = useState(null);
    const { currentUser} = useSelector((state) => state.user);
    useEffect(() => {
        const userId = data.members.find((id)=>id!==currentUser._id);
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
        getUser();
    }, []);


  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <MdFace6 />

          <div className="name" style={{fontSize: '0.8rem'}}>
            <span>{userData?.username}</span>
            {/* <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span> */}
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
