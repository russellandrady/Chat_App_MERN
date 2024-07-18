import { useState } from "react";
import "../styles/style_for_login.css";
import { Link, useNavigate } from "react-router-dom";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpFailure,
  signUpStart,
  signUpSuccess,
} from "../redux/user/userSlice";

export default function SignUp() {
  const [formdata, setFormdata] = useState({});
  const { error, loading } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      dispatch(signUpStart());
      e.preventDefault();
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(signUpFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(signUpSuccess());
      toast.success("Successfully Registered");
      navigate("/");
    } catch (error) {
      dispatch(signUpFailure(data));
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <div className="login-box">
      <div className="login-header">
        <header>Register</header>
      </div>
      <form method="post" onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="text"
            className="input-field"
            name="username"
            id="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="email"
            className="input-field"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            className="input-field"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-submit">
          <button className="submit-btn" id="submit" type="submit"  disabled={loading}><label>Register</label></button>
          
        </div>
      </form>
      <div className="sign-up-link">
        <p>
          Already have account?{" "}
          <Link to={"/"} className="move-link">
            Login
          </Link>
        </p>
      </div>
      {loading && (
        <div className="loading-icon">
          <AiOutlineLoading3Quarters className="icon" />
        </div>
      )}
    </div>
  );
}
