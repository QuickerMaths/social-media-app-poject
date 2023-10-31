// External dependencies

import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Internal dependencies

import { useUserAuthorizationQuery } from "./features/apiSlice/authApiSlice/authApiSlice";

// components imports

import SharedLayout from "./pages/shared-layout/SharedLayout";
import HomePage from "./pages/home-page/HomePage";
import RegisterSuccess from "./pages/register-success/RegisterSuccess";
import UserProfile from "./pages/user-profile/UserProfile";

// components lazy imports

const Login = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/register/Register"));
const UsersList = lazy(() => import("./pages/users-list/UsersList"));

function App() {
  //check if user is already loggedin

  // useUserAuthorizationQuery("");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/user/:userId" element={<UserProfile />} />
            <Route path="/users" element={<UsersList />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-success" element={<RegisterSuccess />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
