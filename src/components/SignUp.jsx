import { Link } from "react-router-dom";
import { useState } from "react";
import { ErrorMessage } from "./Error_message";
import { urlAddresses } from "../assets/urlAddresses";

const titleDiv = document.querySelector("title");
const url = urlAddresses.sign_up;

const SignUp = () => {
  titleDiv.textContent = 'BLOG | SIGN UP';
  const [responseData, setResponseData] = useState("{}");
  
  const [user, setUser] = useState(undefined);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  
  const passwordRequirements =
    responseData.passwordRequirements === undefined
      ? " "
      : responseData.passwordRequirements;


  function handleSubmit(e) {
    e.preventDefault();
    const userdata = {
      username,
      user_password: password,
      confirm_password: confirm,
      email,
      role: "USER",
    };
    fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Connection": "keep-alive",
      },
      body: JSON.stringify(userdata),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponseData(data);
        setUser(data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Link to="/">HOME</Link>
      {user===undefined ? (
        <>
          <h2>Sign Up Here:</h2>
          <ErrorMessage errors={responseData.errors} />

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
                email address:
                <input
                  type="email"
                  name="email"
                  autoComplete="on"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                password:
                <input
                  type="password"
                  name="user_password"
                  autoComplete="off"
                  title={passwordRequirements}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                confirm password:
                <input
                  type="password"
                  name="confirm_password"
                  autoComplete="off"
                  onChange={(event) => setConfirm(event.target.value)}
                  required
                />
              </label>
            </div>
            <label>
              Role:
              <input type="text" name="role" value="USER" readOnly="USER" />
            </label>
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
        <>
          <h2> {responseData.text} </h2>
          <p> {`username: ${user.username}`} </p>
          <div>
            <Link to="login">LOGIN</Link>
          </div>
        </>
      )}
    </>
  );
};

export default SignUp;