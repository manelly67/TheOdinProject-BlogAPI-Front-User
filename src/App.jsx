import { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { urlAddresses } from "./assets/urlAddresses";

import { homepage } from "./mock_data"; // para borrar luego

import "./App.css";

const titleDiv = document.querySelector("title");
const url = urlAddresses.home;
const url_mywork = urlAddresses.my_work;

function App() {
  titleDiv.textContent = "BLOG | HOME";
  const initialData = "{}";
  const navigate = useNavigate();

const blogdata = homepage; // para borrar luego

  /* const [blogdata, setBlogdata] = useState(initialData);
   */

  const allPosts = useMemo(() => {
    return blogdata.allPosts;
  }, [blogdata]);

  const [user, setUser] = useState(null);

  const token =
    localStorage.getItem("token") !== undefined
      ? JSON.parse(localStorage.getItem("token"))
      : null;

  const userlogin = token === null ? false : true;

  /* useEffect(() => {
    if (!allPosts) {
      getData();
    }
  });

  async function getData() {
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      setBlogdata(responseData);
      return setBlogdata;
    } catch (error) {
      alert("Something was wrong. try again later");
      console.log(error);
    }
  } */

  const refreshPosts = useCallback(async () => {
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
        } else {
          alert("token expired");
          navigate("/logout");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, navigate]);

  useEffect(() => {
    if (token !== null) {
      refreshPosts();
    }
  }, [refreshPosts, token]);

  function navigateToDetails(arg1) {
    navigate(arg1);
  }

  return (
    <>
      <nav>
        {!userlogin ? (
          <>
            <div>
              <Link to="sign_up">SIGN UP</Link>
            </div>
            <div>
              <Link to={"login"} state={{ token: token, userlogin: userlogin }}>
                LOGIN
              </Link>
            </div>
          </>
        ) : (
          <>
            <div>
              <Link to="logout">LOGOUT</Link>
            </div>
            <div>
              <Link
                to="/dashboard"
                replace={true}
                state={{ user: user, token: token }}
              >
                USER VIEW
              </Link>
            </div>
          </>
        )}
      </nav>

      <div className="blog-content">
        <h2>website for reading and comment posts</h2>

        <p> {blogdata.message === undefined ? null : blogdata.message} </p>

        {!allPosts ? (
          <div>Loading...</div>
        ) : allPosts.length > 0 ? (
          <ul>
            {allPosts.map((post) => {
              return (
                <li key={post.id}>
                  <p style={{ maxWidth: "200px" }}>{post.title}</p>
                  <p>{post.author.username}</p>

                  <button
                    style={{ height: "55px" }}
                    onClick={() => {
                      navigateToDetails(`posts/${post.authorId}/${post.id}`);
                    }}
                  >
                    DETAILS
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div>There are no posts published!</div>
        )}
      </div>
    </>
  );
}

export default App;