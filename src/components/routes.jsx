import App from "../App";
import Details from "./Details";
import ErrorPage from "./Error_page";
import SignUp from "./SignUp";

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
  {
    path: "sign_up",
    element: <SignUp />,
  },
];

export default routes;
