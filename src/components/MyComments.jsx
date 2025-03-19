import { useState, useEffect, useMemo, useCallback } from "react";
import { useOutletContext } from "react-router-dom";

const titleDiv = document.querySelector("title");

const MyComments = () => {
  titleDiv.textContent = "BLOG | MY COMMENTS";

  const { user, token, responseData, deleteComment, urlAddresses } =
    useOutletContext();

  const mycomments = user === undefined ? null : user.comments;
  const [blogdata, setBlogdata] = useState("{}");
  const allPosts = useMemo(() => {
    return blogdata.allPosts !== undefined ? blogdata.allPosts : null;
  }, [blogdata]);

  const getData = useCallback(async () => {
    try {
      const response = await fetch(urlAddresses.home);
      const responseData = await response.json();
      setBlogdata(responseData);
      return setBlogdata;
    } catch (error) {
      alert("Something was wrong. try again later");
      console.log(error);
    }
  }, [urlAddresses.home]);

  useEffect(() => {
    if (!allPosts) {
      getData();
    }
  });

  function findPostTitle(allPosts, postid) {
    if (allPosts) {
      const post = allPosts.filter((e) => e.id === postid);
      return post[0].title.slice(0, 100);
    }
  }

  return (
    <>
      <div className="error">
        {responseData.err !== undefined ? (
          <p>{responseData.err.message}/ new login is required</p>
        ) : null}
      </div>

      <p style={{ color: "blue" }}>
        {" "}
        {responseData.text === undefined ? null : responseData.text}{" "}
      </p>

      <h3>COMMENTED BY: {user.username}</h3>
      <div className="blog-content">
        {!mycomments ? (
          <div>Loading...</div>
        ) : mycomments.length > 0 ? (
          <ul>
            {mycomments.map((comment) => {
              return (
                <li key={comment.id}>
                  <p style={{ width: "200px" }}>
                    {comment.text.slice(0, 100)}...
                  </p>
                  <p>
                    {new Date(comment.createdAt).toLocaleString("es-US", {
                      timeZone: "America/Guayaquil",
                      dateStyle: "medium",
                    })}
                  </p>
                  <p style={{ width: "200px" }}>
                    ...{findPostTitle(allPosts, comment.postAboutId)}...
                  </p>

                  <button
                    style={{ height: "60px" }}
                    onClick={() => {
                      const url_delete_comment = `${urlAddresses.comments}/${comment.postAboutId}/${comment.id}`;
                      deleteComment(url_delete_comment, token);
                    }}
                  >
                    DELETE
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div>There are no comments here!</div>
        )}
      </div>
    </>
  );
};

export default MyComments;
