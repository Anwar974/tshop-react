import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import'bootstrap/dist/js/bootstrap.bundle.min.js'
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import UserContextProvider from './assets/components/web/context/User.jsx';
import { CartContextProvider } from './assets/components/web/context/Cart.jsx';
const queryClient =new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  {/* ClientProvider بزود الكمبوننتس ب الكلاينت الموجود عندي
  ممكن اعمل كمان بروفايدر اسمو يوزر داتا بروفايدر
  */}
  <UserContextProvider>
    <CartContextProvider>
  <QueryClientProvider client={queryClient}>
    <ToastContainer />
    <App />
  </QueryClientProvider>
  </CartContextProvider>
  </UserContextProvider>
  </>
)
