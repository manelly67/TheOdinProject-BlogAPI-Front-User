import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { urlAddresses } from "../assets/urlAddresses";

const titleDiv = document.querySelector("title");
const url = urlAddresses.logout;

const Logout = () => {
  const [responseData, setResponseData] = useState("{}");
 
  titleDiv.textContent = 'BLOG | LOGOUT';

  useEffect(() => {
    switch (responseData === "{}") {
      case true:
        getData(url);
        break;
      case false:
        break;
    }
  });

  async function getData(arg) {
    try {
      const response = await fetch(arg, { mode: "cors" });
      const temp = await response.json();
      setResponseData(temp);
      localStorage.setItem("token", JSON.stringify(null));
      return setResponseData;
    } catch (error) {
      alert("Something was wrong. try again later");
      console.log(error);
    }
  }

  return (
    <>
      <Link to="/">HOME</Link>

      {!responseData.text ? (
        <div>Logging out...</div>
      ) : (
        <h2>{responseData.text}</h2>
      )}
    </>
  );
};

export default Logout;