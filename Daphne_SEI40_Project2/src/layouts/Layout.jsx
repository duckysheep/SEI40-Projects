import { Outlet } from "react-router-dom";
import TopNavbar from "../components/Navbar";

function Layout() {
  return (
    <>
      <TopNavbar />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}

export default Layout;
