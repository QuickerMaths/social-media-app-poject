import { useEffect, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "./hooks/reduxHooks";
import { getAuth } from "./features/authSlice/authSlice";

// components imports

import SharedLayout from "./pages/shared-layout/SharedLayout";
import HomePage from "./pages/home-page/HomePage";

// components lazy imports

const Login = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/register/Register"));

function App() {
  //check if user is already loggedin

  const dispatch = useAppDispatch();
  useEffect(() => {
    //TODO: refactor fetch to rtkQuery
    const checkLoggedIn = async () => {
      try {
        const res = await fetch(`http://localhost:5000/auth/me`, {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            "Access-Control-Allow-Origin": `http://localhost:5000`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        dispatch(
          getAuth({
            username: data.username,
            userId: data.userId,
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
