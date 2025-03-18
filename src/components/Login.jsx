import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { urlAddresses } from "../assets/urlAddresses";
import { useLocation } from "react-router-dom";

const titleDiv = document.querySelector("title");
const url = urlAddresses.login;

const Login = () => {
  titleDiv.textContent = "BLOG | LOGIN";
  const location = useLocation();
  const { token } = location.state;
  const [responseData, setResponseData] = useState("{}");
  const [activeUser, setActiveUser] = useState(
    token === null ? null : responseData.user
  );
  const [activeToken, setActiveToken] = useState(
    responseData.token === undefined ? token : responseData.token
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const logindata = {
      username,
      password,
    };
    fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Connection: "keep-alive",
      },
      body: JSON.stringify(logindata),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponseData(data);
        if (data.user !== undefined) {
          setActiveUser(data.user);
        }
        if (data.token !== undefined) {
          localStorage.setItem("token", JSON.stringify(data.token));
          setActiveToken(data.token);
        }
        if (data.user === undefined) {
          setResponseData({ errors: "user or password invalid" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Link to="/">HOME</Link>
      {activeUser === null ? (
        <>
          <p style={{ color: "green" }}>
            for study purposes, this login will grant you a 1 hour token.
          </p>
          <h2>Login in your account:</h2>
          {responseData.errors === undefined ? null : (
            <p className="error"> {responseData.errors}</p>
          )}

          <form
            id="sign_up"
            action={url}
            method="POST"
            autoComplete="off"
            noValidate
          >
            <div>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  autoComplete="on"
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </label>
            </div>

            <div>
              <label>
                password:
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </label>
            </div>
            <button
              onClick={(event) => {
                handleSubmit(event);
              }}
            >
              Submit
            </button>
          </form>
        </>
      ) : (
        <Navigate
          to="/user_view"
          replace={true}
          state={{ user: activeUser, token: activeToken }}
        />
      )}
    </>
  );
};

export default Login;