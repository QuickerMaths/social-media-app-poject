import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SharedLayout from "./pages/shared-layout/SharedLayout";
import HomePage from "./pages/home-page/HomePage";

const Login = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/register/Register"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
