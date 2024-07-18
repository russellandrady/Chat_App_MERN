import { FaGoogle } from "react-icons/fa";
import "../styles/style_for_login.css";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
        }),
      });
      const data = await response.json();
      dispatch(signInSuccess(data));
      navigate("/chat");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <button className="google-button" onClick={handleGoogleClick}>
        <FaGoogle />
      </button>
    </div>
  );
}
