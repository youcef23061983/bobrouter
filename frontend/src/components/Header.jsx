import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <NavLink
        style={({ isActive }) => {
          return { color: isActive ? "red" : "grey" };
        }}
        className="site-logo"
        to=""
      >
        #VanLife
      </NavLink>
      <nav>
        <NavLink
          style={({ isActive }) => {
            return { color: isActive ? "red" : "grey" };
          }}
          to="host"
        >
          host
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return { color: isActive ? "red" : "grey" };
          }}
          to="about"
        >
          About
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
    </header>
  );
};

export default Header;
