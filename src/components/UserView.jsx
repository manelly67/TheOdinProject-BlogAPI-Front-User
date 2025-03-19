import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { urlAddresses } from "../assets/urlAddresses";

const titleDiv = document.querySelector("title");

const UserView = () => {
  titleDiv.textContent = "BLOG | DASHBOARD";
  const url_mywork = urlAddresses.my_work;
  const url_posts = urlAddresses.posts;

  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const location = useLocation();
  const [responseData, setResponseData] = useState("{}");

  const initDashboard = useCallback(() => {
    if (location.state !== null) {
      const { user, token } = location.state;
      setUser(user);
      setToken(token);
      if (user !== null) {
        setAllowed(true);
      }
    }
    if (location.state === null) {
      navigate("/");
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (!allowed) {
      initDashboard();
    }
  });

  function navigateToBlogList() {
    navigate("/user_view/blogs");
  }

  function navigateToMyComments() {
    setResponseData("{}");
    navigate("/user_view/mycomments");
  }

  async function refreshPosts() {
    fetch(url_mywork, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user !== undefined) {
          setUser(data.user);
          return data.user;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function deleteComment(url_delete, token) {
    fetch(url_delete, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setResponseData(data);
        refreshPosts();
        navigate("/user_view/mycomments");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {allowed ? (
        <>
          <div className="dashboardHead">
            <>
              <div>
                <h3>HELLO: {user.username} </h3>
              </div>
            </>
          </div>

          <div className="dashboardHead">
            <button
              onClick={() => {
                navigateToBlogList();
              }}
            >
              BLOGS
            </button>

            <button
              onClick={() => {
                navigateToMyComments();
              }}
            >
              MY COMMENTS
            </button>

            <div>
              <button
                onClick={() => {
                  navigate("/logout");
                }}
              >
                LOGOUT
              </button>
            </div>
          </div>

          <div className="error">
            {responseData.err !== undefined ? (
              <p>{responseData.err.message}/ new login is required</p>
            ) : null}
          </div>

          <div>
            <Outlet
              context={{
                allowed,
                user,
                setUser,
                token,
                setToken,
                responseData,
                setResponseData,
                refreshPosts,
                deleteComment,
                url_posts,
                urlAddresses,
              }}
            />
          </div>
        </>
      ) : (
        <>
          <h2> Sorry, maybe: </h2>
          <h2 style={{ textAlign: "left" }}> - your session expired </h2>
          <div className="dashboardHead">
            <Link to="/logout">LOGOUT</Link>
            <Link to="/">HOME</Link>
          </div>
        </>
      )}
    </>
  );
};

export default UserView;
