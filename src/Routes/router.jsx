import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllTouristSpots from "../pages/AllTouristSpots";
import AddTouristSpot from "../pages/AddTouristSpot";
import MyList from "../pages/MyList";
import Update from "../pages/Update";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/all-tourist-spots',
        element: <AllTouristSpots></AllTouristSpots>
      },
      {
        path: '/add-tourist-spot',
        element: <PrivateRoute><AddTouristSpot></AddTouristSpot></PrivateRoute> 
      },
      {
        path: '/my-list',
        element: <PrivateRoute><MyList></MyList></PrivateRoute> 
      },
      {
        path:'/update/:id',
        element:<PrivateRoute><Update></Update></PrivateRoute> 
      }
]
  },
{
  path: '/login',
    element: <Login></Login>
},
{
  path: '/register',
    element: <Register></Register>
}
]);
