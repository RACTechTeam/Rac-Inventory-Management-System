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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children:[
        {
            path:'/',
            element:<Login />
        },
        
        {
            path:'/forgotpassword',
            element:<Forgotpassword/>,
        },
        {
          path:'/resetpassword/:token',
          element:<Resetpassword/>,
        }
      ]
    },

    {
      path:'/dashboard',
      element: <DashboardLayout/>,
      children:[
        {
          path:"/dashboard",
          element:<Dashboard/>
        },
        {
          path:"/dashboard/upload",
          element:<CreateItem/>
        },
        {
          path:"/dashboard/manage",
          element:<ManageItems/>,

        },
        {
          path:'/dashboard/edit/:refNumber',
          element:<EditItems/>,
          // loader:({params}) => fetch(`http://localhost:4000/rac/product/${params.refNumber}`)
        },
        {
          path:'/dashboard/manageusers',
          element:<ManageUsers/>
        },

        {
          path:'/dashboard/allitems',
          element:<GetAllItems/>
        },
        {
          path:'/dashboard/supplier',
          element:<AddSupplier/>
        },

        {
          path:'/dashboard/allsupplier',
          element:<AllSupplier/>
        },

        {
          path:'/dashboard/userrequest',
          element:<UserRequest/>
        }
      ]
    }
  ]);

export default router;