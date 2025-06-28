import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect } from "react";
import useNavigationStore from "@/store/navigationStore";

const NavigationSync = () => {
  const location = useLocation();
  const { setActiveLink } = useNavigationStore();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname, setActiveLink]);

  return null;
};
const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationSync />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
