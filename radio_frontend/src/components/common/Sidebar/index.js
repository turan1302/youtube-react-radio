import React, {Component} from 'react'
import {Link} from "react-router-dom";
import withRouter from "../../../withRouter";

class Sidebar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            toggled : false
        }
    }

    handleToggle = ()=>{
        const {toggled} = this.state;
        this.setState({
            toggled : !toggled
        })
    }

    render() {
        const {toggled} = this.state;
        const {location} = this.props;

        return (
            <>
                <ul className={`navbar-nav bg-gradient-primary ${(toggled) ? 'toggled' : ''} sidebar sidebar-dark accordion`} id="accordionSidebar">

                    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                        <div className="sidebar-brand-text mx-3">mRadio</div>
                    </a>

                    <hr className="sidebar-divider my-0"/>

                    <li className={`nav-item ${(location.pathname==='/') ? 'active' : ''}`}>
                        <Link className="nav-link" to={"/"}>
                            <i className="fas fa-fw fa-home"></i>
                            <span>Anasayfa</span></Link>
                    </li>

                    <hr className="sidebar-divider"/>

                    <li className={`nav-item ${(location.pathname==='/favourite') ? 'active' : ''}`}>
                        <Link className="nav-link" to={"/favourite"}>
                            <i className="fas fa-fw fa-heart"></i>
                            <span>Favoriler</span></Link>
                    </li>


                    <hr className="sidebar-divider d-none d-md-block"/>

                    <div className="text-center d-none d-md-inline">
                        <button onClick={()=>this.handleToggle()} className="rounded-circle border-0" id="sidebarToggle"></button>
                    </div>


                </ul>
            </>
        )
    }
}

export default withRouter(Sidebar);
