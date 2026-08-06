import NAVBAR from "../components/NavBar.jsx";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="container-fluid">
        <NAVBAR />

        <main className="container mt-3">
          <Outlet />
        </main>

        <footer className="text-center mt-5">© 2026 Teacher App</footer>
      </div>
    </>
  );
}

export default Layout;
