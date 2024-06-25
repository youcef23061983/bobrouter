import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Hostlayout = () => {
  return (
    <>
      <nav className="host-nav">
        <NavLink
          style={({ isActive }) => {
            return { color: isActive ? "red" : "grey" };
          }}
          to=""
          end
        >
          Dashboard
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return { color: isActive ? "red" : "grey" };
          }}
          to="income"
        >
          Income
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return { color: isActive ? "red" : "grey" };
          }}
          to="reviews"
        >
          Reviews
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return { color: isActive ? "red" : "grey" };
          }}
          to="vans"
        >
          Vans
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
};

export default Hostlayout;
