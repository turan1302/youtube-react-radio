import React, {Component} from 'react'
import Sidebar from "../../components/common/Sidebar";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import AuthLayout from "../../components/Layout/AuthLayout";

class Favourite extends Component {
    render() {
        return (
            <AuthLayout>
                <div id="wrapper">

                    <Sidebar/>

                    <div id="content-wrapper" className="d-flex flex-column">

                        <div id="content">

                            <Header/>

                            <div className="container-fluid">

                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Favori Radyo Listesi</h1>
                                </div>

                                <div className="row">

                                    <div className={"col-md-12 my-3"}>
                                        <input className={"form-control"} placeholder={"Radyo ismi giriniz..."}/>
                                    </div>

                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div
                                                            className="text-xs font-weight-bold text-uppercase mb-1">
                                                            Kral Pop
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fas fa-play fa-2x text-gray-300"></i>
                                                        <i className="fas fa-times ml-3 fa-2x text-danger"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <Footer/>

                    </div>

                </div>
            </AuthLayout>
        )
    }
}

export default Favourite;
