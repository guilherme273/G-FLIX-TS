import Teste from "../Components/teste";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import NotFound404 from "../Pages/NotFound404/NotFound404";
import Register from "../Pages/Register/Register";
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
    path: "/dashboard",
    element: <IsAdmin />,
    children: [
      {
        path: "",
        element: <Teste />,
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
