import Overview from "../Pages/Admin/Overview/Overview";
import Favorites from "../Pages/Favorites/Favorites";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import NotFound404 from "../Pages/NotFound404/NotFound404";
import Register from "../Pages/Register/Register";
import Search from "../Pages/Search/Search";
import Watch from "../Pages/Watch/Watch";
import IsAdmin from "../RouteGuards/IsAdmin";
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
  {
    path: "/search",
    element: <LoggedIn />,
    children: [
      {
        path: "",
        element: <Search />,
      },
    ],
  },
  {
    path: "/favorites",
    element: <LoggedIn />,
    children: [
      {
        path: "",
        element: <Favorites />,
      },
    ],
  },
  {
    path: "/watch/:id/:category_id",
    element: <LoggedIn />,
    children: [
      {
        path: "",
        element: <Watch />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <IsAdmin />,
    children: [
      {
        path: "",
        element: <Overview />,
      },
    ],
  },
  {
    path: "*",
    element: <LoggedIn />,
    children: [
      {
        path: "*",
        element: <NotFound404 />,
      },
    ],
  },
];
