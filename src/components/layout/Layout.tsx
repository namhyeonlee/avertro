import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <div>
      <div className="head">
        <img src={process.env.PUBLIC_URL + "/images/Logo.png"} />
      </div>
      <div>
        <Outlet />
      </div>
      <ToastContainer position="top-right" autoClose={1500} limit={10} style={{ zIndex: "20000" }} />
    </div>
  );
};
export default Layout;
