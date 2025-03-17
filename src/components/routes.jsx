import App from "../App";
import Details from "./Details";

const routes = [
    {
      index: true,
      path: "/",
      element: <App />,
  
     /*  errorElement: <ErrorPage />, */
    },
    {
      path: "posts/:authorid/:postid",
      element: <Details />,
    },
];

export default routes;