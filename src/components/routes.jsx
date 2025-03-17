import App from "../App";
import Details from "./Details";
import ErrorPage from "./Error_page";

const routes = [
  {
    index: true,
    path: "/",
    element: <App />,

    errorElement: <ErrorPage />,
  },
  {
    path: "posts/:authorid/:postid",
    element: <Details />,
  },
];

export default routes;
