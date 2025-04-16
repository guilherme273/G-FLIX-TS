import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import LoggedIn from "../RouteGuards/LoggedIn";

export const Routes = [
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <LoggedIn />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
];
