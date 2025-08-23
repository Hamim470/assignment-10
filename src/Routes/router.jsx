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
        element: <AddTouristSpot></AddTouristSpot>
      },
      {
        path: '/my-list',
        element: <MyList></MyList>
      },
      {
        path:'/update/:id',
        element:<Update></Update>
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
