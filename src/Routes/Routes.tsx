import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

import IsLogaded from "../RouteGuards/IsLogaded";

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
    element: <IsLogaded />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
];
