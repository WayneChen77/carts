import React, { useContext } from "react";
import Getapi from "./apiaxios";
import { Link, NavLink } from "react-router-dom";
import { CurrentContext } from "../top-compontent";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useContext(CurrentContext);
  const { nickName } = currentUser ?? "";

  //登出
  const handelClickLogOut = () => {
    Getapi.logout();
    setCurrentUser(null);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fs-4">
        <div className="container-fluid">
          <Link className="navbar-brand fs-2" to="/">
            Shop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse navTotal"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <NavLink
                className="nav-link "
                activeclassname="active"
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
              {currentUser && (
                <>
                  <NavLink
                    className="nav-link phonerwd1"
                    activeclassname="active"
                    to="/profile"
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    className="nav-link phonerwd2"
                    activeclassname="active"
                    to="/profile/userprofile"
                  >
                    Profile
                  </NavLink>
                </>
              )}
              {currentUser.current === "sells" && (
                <>
                  <NavLink
                    to="profile/myproduct"
                    className="nav-link phonerwd2"
                  >
                    <h3>Myproduct</h3>
                  </NavLink>
                  <NavLink to="profile/myclient" className="nav-link phonerwd2">
                    <h3>Myclient</h3>
                  </NavLink>
                </>
              )}
            </div>
            {/* 導覽右方區塊 */}
            <div className="navbar-nav  me-5">
              {currentUser ? (
                <React.StrictMode>
                  <NavLink
                    className="nav-link "
                    activeclassname="active"
                    aria-current="page"
                    to="/profile"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="currentColor"
                      className="bi bi-person-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                    {nickName}
                  </NavLink>
                  <a
                    className="nav-link "
                    aria-current="page"
                    href="/"
                    onClick={handelClickLogOut}
                  >
                    LOGOUT
                  </a>
                </React.StrictMode>
              ) : (
                <React.StrictMode>
                  <NavLink
                    className="nav-link "
                    activeclassname="active"
                    aria-current="page"
                    to="/register"
                  >
                    REGISTER
                  </NavLink>
                  <NavLink
                    className="nav-link "
                    activeclassname="active"
                    aria-current="page"
                    to="/login"
                  >
                    LOGIN
                  </NavLink>
                  ;
                </React.StrictMode>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
