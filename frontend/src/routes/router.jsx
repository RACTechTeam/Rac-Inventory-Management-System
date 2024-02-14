import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import Forgotpassword from "../Components/forgotpassword";
import Resetpassword from "../Components/resetpassword";
import Login from "../Components/Login";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import CreateItem from "../dashboard/CreateItem";
import ManageItems from "../dashboard/ManageItems";
import EditItems from "../dashboard/EditItems";
import ManageUsers from "../dashboard/ManageUsers";
import GetAllItems from "../dashboard/GetAllItems";
import AddSupplier from "../dashboard/AddSupplier";
import AllSupplier from "../dashboard/AllSupplier";
import UserRequest from "../dashboard/Userrequest";
import Signup from "../Components/Signup";
import PrivateRoute from "../Components/PrivateRoute";
import NotFound from "../Components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "forgotpassword",
        element: <Forgotpassword />,
      },
      {
        path: "resetpassword/:token",
        element: <Resetpassword />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "", // Remove the leading "/" to make it relative
            element: <Dashboard/>,
          },
          {
            path: "upload",
            element: <CreateItem />,
          },
          {
            path: "manage",
            element: <ManageItems/>,
          },
          {
            path: "edit/:refNumber",
            element: <EditItems/>,
          },
          {
            path: "manageusers",
            element: <ManageUsers />,
          },
          {
            path: "allitems",
            element: <GetAllItems />,
          },
          {
            path: "supplier",
            element: <AddSupplier />,
          },
          {
            path: "allsupplier",
            element: <AllSupplier />,
          },
          {
            path: "userrequest",
            element: <UserRequest />,
          },
        ],
      },
      // Add a catch-all route for invalid paths
      {
        path: "*", // Matches any path not matched by the above routes
        element: <NotFound />, // You need to define a NotFound component
      },
    ],
  },
]);

export default router;
