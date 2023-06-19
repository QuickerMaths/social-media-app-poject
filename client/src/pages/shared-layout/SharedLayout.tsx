import { Suspense } from "react";
import Header from "../../components/header/Header";
import { Outlet } from "react-router";
import LoadingPage from "../../utilities/LoadingPage";
import Sidebar from "../../components/sidebar/Sidebar";

const SharedLayout = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Sidebar />
        <Suspense fallback={<LoadingPage />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default SharedLayout;
