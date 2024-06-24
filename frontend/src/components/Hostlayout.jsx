import React from "react";
import { Link, Outlet } from "react-router-dom";

const Hostlayout = () => {
  return (
    <>
      <nav className="host-nav">
        <Link to="">Dashboard</Link>
        <Link to="income">Income</Link>
        <Link to="reviews">Reviews</Link>
      </nav>
      <Outlet />
    </>
  );
};

export default Hostlayout;
