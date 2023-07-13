import { useState } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className="head">
        <img src="/images/Logo.png" />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
