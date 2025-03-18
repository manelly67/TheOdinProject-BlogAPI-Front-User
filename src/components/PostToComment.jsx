import { useState, useEffect, useCallback } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import NewComment from "./NewComment";

const titleDiv = document.querySelector("title");
titleDiv.textContent = "BLOG | DETAILS";

const PostToComment = () => {
  const [postd, setPostd] = useState(null);

  const {
    user,
    token,
    responseData,
    setResponseData,
    refreshPosts,
    deleteComment,
    urlAddresses,
  } = useOutletContext();

  const [activeIndex, setActiveIndex] = useState(0);
  const { authorid } = useParams();
  const { postid } = useParams();
  const url = `${urlAddresses.posts}/${authorid}/${postid}`;
  const url_comment = `${urlAddresses.comments}/${postid}/new`;

  const getData = useCallback(async () => {
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      setPostd(responseData);
      setResponseData("{}");
    } catch (error) {
      alert("Something was wrong. try again later");
      console.log(error);
    }
  }, [url, setResponseData]);

  useEffect(() => {
    if (postd === null) {
      getData();
    }
  }, [postd, getData]);

  return (
    <>
      <article className="postDetails">
        {postd === null ? (
          <>
            <p>loading...</p>
          </>
        ) : (
          <>
            {postd.text !== undefined ? (
              <p>null</p>
            ) : (
              <>
                <h2
                  style={{ gridRow: 1, gridColumnStart: 1, gridColumnEnd: 3 }}
                >
                  {postd.post.title}
                </h2>
                <h3
                  style={{ gridRow: 2, gridColumnStart: 1, gridColumnEnd: 2 }}
                >
                  Author: {postd.post.author.username}
                </h3>
                <p style={{ gridRow: 2, gridColumnStart: 2, gridColumnEnd: 3 }}>
                  Publish at:{" "}
                  {new Date(postd.post.createdAt).toLocaleString("es-US", {
                    timeZone: "America/Guayaquil",
                    dateStyle: "medium",
                  })}
                </p>
                <div
                  style={{
                    gridRow: 3,
                    gridColumnStart: 1,
                    gridColumnEnd: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        textAlign: "justify",
                      }}
                    >
                      {postd.post.content}
                    </p>
                  </div>

                  <div>
                    <p> COMMENTS:</p>
                    {postd.post.comments.length > 0 ? (
                      <>
                        <ul
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                          }}
                        >
                          {postd.post.comments.map((comment) => {
                            return (
                              <li
                                key={comment.id}
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: "5px",
                                }}
                              >
                                <p style={{ maxWidth: "200px" }}>
                                  {comment.text}
                                </p>
                                <p>{comment.user.username}</p>
                                <p>
                                  {new Date(comment.createdAt).toLocaleString(
                                    "es-US",
                                    {
                                      timeZone: "America/Guayaquil",
                                      dateStyle: "medium",
                                      timeStyle: "short",
                                    }
                                  )}
                                </p>

                              </li>
                            );
                          })}
                        </ul>
                      </>
                    ) : (
                      <div>This posts has no comments!</div>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </article>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        <NewComment
          isActive={activeIndex === 1}
          onShow={() => setActiveIndex(1)}
          setActiveIndex={setActiveIndex}
          user={user}
          token={token}
          url_comment={url_comment}
          responseData={responseData}
          setResponseData={setResponseData}
          refreshPosts={refreshPosts}
        />
      </div>
    </>
  );
};

export default PostToComment;