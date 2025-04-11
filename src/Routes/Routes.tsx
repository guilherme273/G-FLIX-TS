import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";

import IsLogaded from "../RouteGuards/IsLogaded";

export const Routes = [
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
  {
    path: "/Login",
    element: <Login />,
  },
];
