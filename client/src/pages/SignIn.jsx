import { useState } from "react";
import "../styles/style_for_login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SignIn() {
  const [formdata, setFormdata] = useState({});
  const { error, loading } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {

    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();

      if (data.success === false) {
        dispatch(signInFailure(data));
        toast.error(data.message);
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/chat");
    } catch (error) {
      dispatch(signInFailure(error));
      toast.error(error);
    }
  };
  return (
    <div className="login-box">
      <div className="login-header">
        <header>Login</header>
      </div>
      <form method="post" onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="email"
            className="input-field"
            name="email"
            id="email"
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            className="input-field"
            name="password"
            id="password"
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="input-submit">
          <button className="submit-btn" id="submit" type="submit"  disabled={loading}><label>Sign In</label></button>
          
        </div>
        
      </form>
      <div className="sign-up-link">
        <p>
          Don't have account?{" "}
          <Link to={"/sign-up"} className="move-link">
            Sign Up
          </Link>
        </p>
      </div>
      <OAuth/>
      {loading && (
        <div className="loading-icon">
          <AiOutlineLoading3Quarters className="icon" />
        </div>
      )}
    </div>
  );
}
