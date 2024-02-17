import Home from './../assets/components/web/home/Home.jsx';
 import { RouterProvider} from "react-router-dom";
import Login from "../assets/components/web/login/Login.jsx";
import Register from "../assets/components/web/register/Register.jsx";
import Layouts from "./Layout.jsx";
import DashboardLayout from "./DashboardLayout.jsx";
import CategoriesDetails from "../CategoriesDetails.jsx";
import Product from "../assets/components/web/Product/Product.jsx";
import Cart from '../assets/components/web/cart/Cart.jsx';
import Categories from '../assets/components/web/categories/Categories.jsx';
import { createBrowserRouter} from 'react-router-dom';
import ProtectedRoute from '../assets/components/web/protectedRoute/ProtectedRoute.jsx';
import Profile from '../assets/components/web/profile/Profile.jsx';
import UserInfo from '../assets/components/web/profile/UserInfo.jsx';
import UserContact from '../assets/components/web/profile/UserContact.jsx';
import SendCode from '../assets/components/web/auth/SendCode.jsx';
import ForgotPassword from '../assets/components/web/auth/ForgotPassword.jsx';



export const router = createBrowserRouter([
    {
      path:'/',
      element:<Layouts />,
      children:[
          {
            path:'register',
            element:<Register />
          },
          {
            path:'login',
            element:
                <Login />
          },
          {
            path:'sendCode',
            element:
                <SendCode />
          },
          {
            path:'forgotPassword',
            element:
                <ForgotPassword />
          },
          {
            path:'profile',
            element:
            <ProtectedRoute >
              <Profile />
            </ProtectedRoute>,
            children:[
              {
                index: true,
                element: <UserInfo/>
              },
              {
                path:'contact',
                element: <UserContact/>
              },

            ],
          },
          {
            // path:'home',
            index: true,
            element:<Home />
          },
          {
            path:'cart',

            element:
            <ProtectedRoute isAllowed = {true}>
              <Cart />
            </ProtectedRoute>
          },
          {
            path:'categories',
            element:<Categories />
          },
          // :categoryId can be named anything
          {
            path:'products/category/:categoryId',
            element:<CategoriesDetails />
          },
          {
            path:'product/:productId',
            element:<Product/>
          },
          {
            path:'*',
            element:<h2>page not found --- web</h2>
          }
      ]
    },
    {
        path:'/dashboard',
        element:<DashboardLayout />,
        children:[{
        path:'home',
        // element:<HomeDashboard />
      }
      ,
      {
        path:'categories',
        // element:<CategoriesDashboard />
      },
      {
        path:'*',
        element:<h2>page not found --- dashboard</h2>
      }
    ]
 
    }
  ]);
