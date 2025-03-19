import { useState } from "react";
import { ErrorMessage } from "./Error_message";
import { useNavigate } from "react-router-dom";

const NewComment = (props) => {
  const navigate = useNavigate();
  const [text, setText] = useState(null);

  async function handleSubmit(event, url, token) {
    event.preventDefault();
    props.setResponseData("{}");
    const postdata = {
      text: `${text}`,
    };

    await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postdata),
    })
      .then((res) => res.json())
      .then((data) => {
        props.setResponseData(data);
        props.refreshPosts();
        props.setActiveIndex(0);
        navigate("/user_view/blogs");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {props.isActive ? (
        <>
          <div>
            <InputForm
              setActiveIndex={props.setActiveIndex}
              user={props.user}
              setText={setText}
              responseData={props.responseData}
              url_comment={props.url_comment}
              token={props.token}
              handleSubmit={handleSubmit}
            />
          </div>
        </>
      ) : (
        <button onClick={props.onShow}>ADD COMMENT</button>
      )}
    </>
  );
};

function InputForm(props) {
  return (
    <>
      <div className="error">
        {props.responseData.err !== undefined ? (
          <p>{props.responseData.err.message}/ logout: new login is required</p>
        ) : null}
      </div>

      {props.responseData.text !== undefined ? (
        <>
          <p>{props.responseData.text} </p>
        </>
      ) : (
        <>
          <section>
            <ErrorMessage errors={props.responseData.errors} />
            <form>
              <p>
                This comment is written by
                <span style={{ fontSize: "1.5rem", paddingLeft: "4px" }}>
                  {props.user.username}
                </span>
              </p>
              <label>Comment:</label>
              <textarea
                id="comment"
                name="text"
                title="max 300 characters"
                style={{ height: "150px" }}
                onChange={(event) => props.setText(event.target.value)}
              ></textarea>

              <button
                onClick={(event) => {
                  props.handleSubmit(event, props.url_comment, props.token);
                }}
              >
                Submit
              </button>
            </form>

            <button
              onClick={() => {
                props.setActiveIndex(0);
              }}
            >
              close
            </button>
          </section>
        </>
      )}
    </>
  );
}

export default NewComment;
