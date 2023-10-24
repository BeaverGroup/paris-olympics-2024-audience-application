import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { useGoogleLogin } from "@react-oauth/google";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import {
  Login_api_google,
  TokenDecodeGOOGLE,
  login_api,
} from "../../services/Api";
import { useContext } from "react";
import { UserStateContext } from "../../App";
import Swal from "`sweetalert2`";

function LoginPage() {
  const { userState, setUserState } = useContext(UserStateContext); // userState  is data of user after jwt decode from app.jsx
  const [googleTokenOfUser, setGoolgeTokenOfUser] = useState(null); // useEffective when google login for local
  const [input, setInput] = useState({ Email: "", Password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGoogleUserData() {
      console.log(googleTokenOfUser);
      if (googleTokenOfUser) {
        // console.log("googleTokenOfUser", googleTokenOfUser);
        const response = await TokenDecodeGOOGLE(googleTokenOfUser);
        console.log("response", response);
        if (response) {
          const user_data = response.data;
          console.log(user_data);
          try {
            const data_body = {
              Email: user_data.email,
              Token: googleTokenOfUser,
            };
            // console.log(data_body)
            const response_google_login = await Login_api_google(data_body);
            console.log(response_google_login);
            if (response_google_login.status === 201) {
              // this email has db
              const data_user = response_google_login.data.user;
              console.log(data_user);
              // setUserState(data_user);
              navigate("/");
              window.location.reload();
            } else if (
              response_google_login.status === 409 &&
              response_google_login.data.message == "Email not use"
            ) {
              //redirect set info page with  prop of email
            } else {
              console.log("login fail");
              console.log(response_google_login);
            }
          } catch (err) {
            console.log(err);
          }
          // setUserState(data_user);
          navigate("/");
          window.location.reload();
        }
      }
    }
    fetchGoogleUserData();
  }, [googleTokenOfUser]);

  const loginGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setGoolgeTokenOfUser(codeResponse.access_token);
      // setIsLogin(true);
      console.log("codeResponse", codeResponse);
      localStorage.setItem("accessToken", codeResponse.access_token);
      // window.location.reload();
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleChange = (e) => {
    const { target } = e; //  target = e.target is thing that changed state
    const { name } = target; // name = e.target.name
    const value = e.target.value;
    setInput({ ...input, [name]: value });
    // console.log(formInput);
  };

  const onSubmit = async (e, data_form) => {
    e.preventDefault();
    try {
      // api will sent cookie and respose
      const response = await login_api(data_form);
      console.log(response);
      if (response.status === 201) {
        const data_user = response.data.user;
        console.log(data_user);
        // setUserState(data_user);
        navigate("/");
        window.location.reload();
      }
      if (
        response.status === 400 &&
        response.data.message === "Password is wrong"
      ) {
        Swal.fire({
          icon: "warning",
          title: "Password is wrong",
          text: "Please check mail and password again",
          confirmButtonColor: "#7fcee2",
        });
        console.log("wrong password");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container_auth">
      <div>
        <div className="form-container_auth " id="login-form">
          <div id="auth_topic">Sign In</div>
          <img
            id="img_auth"
            src="../../image/login_img.png"
            alt="Italian Trulli"
          />
          {/* <button id="button_auth" type="submit" onClick={test}>
            Cookies
          </button> */}
          <form
            id="form_auth"
            onSubmit={(e) => {
              onSubmit(e, input);
            }}
          >
            <label id="label_auth">Email</label>
            <input
              className="input_auth"
              type="text"
              id="Email"
              name="Email"
              onChange={handleChange}
              // value={input.username}
              required
            />
            <label id="label_auth">Password</label>
            <input
              className="input_auth"
              type="password"
              id="password"
              name="Password"
              onChange={handleChange}
              // valก={input.password}
              required
            />
            <button id="button_auth" type="submit">
              Login
            </button>
          </form>

          <Divider
            style={{ color: "gray", fontSize: "0.8rem", margin: "1rem" }}
          >
            OR
          </Divider>

          {/* google login */}
          {false ? null : (
            <div id="container_auth_button">
              <div className="g-signin-button" onClick={loginGoogle}>
                <div className="g-icon">
                  <img src="../../image/google_icon.png" alt="Google Icon" />
                </div>
                <span className="g-text"></span>
              </div>
            </div>
          )}

          <div
            id="auth-box-link "
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span id="text_auth">Don't have an account? </span>
          </div>
          <div
            id="auth-box-link "
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span href="/register" id="signup-link">
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;