import React, { useState, useEffect } from "react";
import { withRouter, NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/authContext/AuthState";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";

// import { notification } from "../utility/notification";

const NavBar = (props) => {
  const { logoutUser, isAuthenticated, user } = useAuth();
  const [showlink, setshowlink] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handelResiz = () => {
    setWindowWidth(window.innerWidth);

    if (windowWidth > 800) {
      setshowlink(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handelResiz);
    return () => {
      window.removeEventListener("resize", handelResiz);
    };
    //eslint-disable-next-line
  }, []);

  const handleClick = () => {
    logoutUser();
  };

  const mobileMenu = (
    <ul className="show-link">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="active" to="/campground">
          Moments
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="active" to="/addGround">
          Share Moment
        </NavLink>
      </li>
    </ul>
  );

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <h1>Moment</h1>
          <ul className={`main-link `}>
            <li>
              <NavLink exact activeClassName="active" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="active" to="/campground">
                Moments
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="active" to="/addGround">
                Share Moment
              </NavLink>
            </li>
          </ul>
          <ul>
            {!isAuthenticated ? (
              <>
                <li>
                  <NavLink exact activeClassName="active" to="/signup">
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink exact activeClassName="active" to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>{`Welcome, ${user}`}</li>
                <li>
                  <Link to="#" onClick={handleClick}>
                    Logout
                  </Link>
                </li>
              </>
            )}
            {showlink ? (
              <li>
                <MdClose
                  color="f2f2f2"
                  fontSize="1.7rem"
                  className="menu-icon"
                  onClick={() => setshowlink(!showlink)}
                />
              </li>
            ) : (
              <li>
                <FiMenu
                  color="f2f2f2"
                  fontSize="1.7rem"
                  className="menu-icon"
                  onClick={() => setshowlink(!showlink)}
                />
              </li>
            )}
          </ul>
        </div>
      </nav>
      {showlink && mobileMenu}
    </>
  );
};

export default withRouter(NavBar);
