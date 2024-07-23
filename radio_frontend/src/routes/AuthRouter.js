import React, { Component } from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Favourite from "../pages/Favoruite";
import Logout from "../pages/Logout";

export default class AuthRouter extends Component {
  render() {
    return (
     <Routes>
         <Route path={"/"} element={<Home/>}></Route>
         <Route path={"/favourite"} element={<Favourite/>}></Route>
         <Route path={"/logout"} element={<Logout/>}></Route>
         <Route path={"*"} element={<Navigate to={"/"}/>}></Route>
     </Routes>
    )
  }
}
