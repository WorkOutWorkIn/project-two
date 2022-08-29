import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Sidebar.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { auth } from "../Db/Firebase";
import { IconContext } from "react-icons";

export default function Sidebar(props) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const signOut = async () => {
    await signOut(auth).then(() => {
      console.log("You have signed out!");
    });
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#84a3bf" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars className="icon-button" onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose className="close-button" />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li className="nav-text sign-out" onClick={() => signOut()}>
              <Link to="/">
                <span>Log out</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
