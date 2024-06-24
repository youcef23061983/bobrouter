import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header>
        <NavLink
          className="site-logo"
          to="."
          style={({ isActive }) => {
            return { color: isActive ? "red" : "grey" };
          }}
        >
          #VanLife
        </NavLink>
        <nav>
          <NavLink
            to="about"
            style={({ isActive }) => {
              return { color: isActive ? "red" : "grey" };
            }}
          >
            About
          </NavLink>
          <NavLink
            to="vans"
            style={({ isActive }) => {
              return { color: isActive ? "red" : "grey" };
            }}
          >
            Vans
          </NavLink>
          <NavLink
            to="host"
            style={({ isActive }) => {
              return { color: isActive ? "red" : "grey" };
            }}
          >
            host
          </NavLink>
        </nav>
      </header>
    </div>
  );
};

export default Header;
