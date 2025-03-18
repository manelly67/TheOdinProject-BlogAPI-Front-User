import App from "../App";
import Details from "./Details";
import ErrorPage from "./Error_page";
import SignUp from "./SignUp";
import Login from "./Login";
import Logout from "./Logout";
import UserView from "./UserView";
import BlogList from "./BlogList";
import PostToComment from "./PostToComment";
import MyComments from "./MyComments";

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
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
  {
    path: "user_view",
    element: <UserView />,
    children: [
      {
        path: "mycomments",
        element: <MyComments />,
      },
      {
        path: "blogs",
        element: <BlogList />,
      },
      {
        path: "blogs/:authorid/:postid",
        element: <PostToComment />,
      },
    ]
  },

];

export default routes;
