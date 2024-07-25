import React, {Component} from 'react'
import Sidebar from "../../components/common/Sidebar";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import AuthLayout from "../../components/Layout/AuthLayout";
import {inject, observer} from "mobx-react";
import withRouter from "../../withRouter";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Notification from "../../RestAPI/Notification";

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchText : '',
            radios : [],
            isLoading : true
        }
    }

    componentDidMount() {
        this.getRadios();
    }

    getRadios = ()=>{
        this.props.AuthStore.getToken();
        const token = (this.props.AuthStore.appState!==null) ? this.props.AuthStore.appState.user.access_token : null;

        RestClient.getRequest(AppUrl.home,{
            headers : {
                "Authorization" : "Bearer "+token
            }
        }).then((res)=>{
            const status = res.status;
            const result = res.data;

            if (status===200){
                this.setState({
                    isLoading : false,
                    radios : result.data
                })
            }
        }).catch((err)=>{
            console.log(err);
            Notification.error({
                title : "Hata",
                message : "Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz"
            })
        })
    }

    radioRender = (data)=>{
        const {searchText} = this.state;

        let newRadio = data.filter(item=>{
            return item.rd_name.match(searchText);
        })

        return newRadio.map((item,index)=>{
            return (
                <div key={index} className="col-xl-3 col-md-6 mb-4">
                    <div className="card shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div
                                        className="text-xs font-weight-bold text-uppercase mb-1">
                                        {item.rd_name}
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-play fa-2x text-gray-300"></i>
                                    <i className="fas fa-heart ml-3 fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        const {isLoading, radios} = this.state;

        if (isLoading) {
            return (
                <div className={"d-flex justify-content-center align-items-center vh-100"}>
                    Yükleniyor...
                </div>
            )
        }

        return (
            <AuthLayout>
                <div id="wrapper">

                    <Sidebar/>

                    <div id="content-wrapper" className="d-flex flex-column">

                        <div id="content">

                            <Header/>

                            <div className="container-fluid">

                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Radyo Listesi</h1>
                                </div>

                                <div className="row">

                                    <div className={"col-md-12 my-3"}>
                                        <input onChange={(e)=>this.setState({searchText : e.target.value})} className={"form-control"} placeholder={"Radyo ismi giriniz..."}/>
                                    </div>

                                    {(radios.length > 0) ? this.radioRender(radios) : (
                                        <div className={"alert alert-danger text-center"}>
                                            Herhangi bir radyo kanalı bulunamadı
                                        </div>
                                    )}

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

export default withRouter(inject("AuthStore")(observer(Home)));
