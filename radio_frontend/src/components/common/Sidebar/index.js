import React, { Component } from 'react'
import {Link} from "react-router-dom";

class Sidebar extends Component {
  render() {
    return (
        <>
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-text mx-3">mRadio</div>
                </a>

                <hr className="sidebar-divider my-0"/>

                <li className="nav-item">
                    <Link className="nav-link" to={"/"}>
                        <i className="fas fa-fw fa-home"></i>
                        <span>Anasayfa</span></Link>
                </li>

                <hr className="sidebar-divider"/>

                <li className="nav-item">
                    <Link className="nav-link" to={"/favourite"}>
                        <i className="fas fa-fw fa-heart"></i>
                        <span>Favoriler</span></Link>
                </li>


                <hr className="sidebar-divider d-none d-md-block"/>

                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>


            </ul>
        </>
    )
  }
}

export default Sidebar;
