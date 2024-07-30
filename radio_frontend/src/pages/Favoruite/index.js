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
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {Helmet} from "react-helmet";
import { BarsSpinner } from "react-spinners-kit";

class Favourite extends Component {

    constructor(props) {
        super(props);

        const {user} = (this.props.AuthStore.appState !== null) ? this.props.AuthStore.appState : {};

        this.state = {
            searchText: '',
            radios: [],
            isLoading: true,
            playUrl : user.url,
            playChannel : user.channel
        }
    }

    componentDidMount() {
        this.getRadios();
    }

    getRadios = () => {
        this.props.AuthStore.getToken();
        const token = (this.props.AuthStore.appState !== null) ? this.props.AuthStore.appState.user.access_token : null;

        RestClient.getRequest(AppUrl.favourites, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((res) => {
            const status = res.status;
            const result = res.data;

            if (status === 200) {
                this.setState({
                    isLoading: false,
                    radios: result.data
                })
            }
        }).catch((err) => {
            console.log(err);
            Notification.error({
                title: "Hata",
                message: "Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz"
            })
        })
    }

    play = (url,channel)=>{
        const {navigate} = this.props;
        this.props.AuthStore.getToken();
        const token = (this.props.AuthStore.appState !== null) ? this.props.AuthStore.appState.user.access_token : null;

        RestClient.postRequest(AppUrl.update,{
            url : url,
            channel : channel
        },{
            headers : {
                "Authorization" : "Bearer "+token
            }
        }).then((res)=>{
            const result = res.data;

            if (result.success===false){
                Notification.error(result);
                navigate("/");
            }else{
                this.setState({
                    playUrl : url,
                    playChannel : channel
                },()=>{
                    let userData = {
                        id : result.data.id,
                        name : result.data.name,
                        email : result.data.email,
                        url : result.data.url,
                        channel : result.data.channel,
                        access_token : result.data.access_token
                    }

                    let appState = {
                        "isLoggedIn" : true,
                        "user" : userData
                    }

                    this.props.AuthStore.saveToken(appState);
                });
            }

        }).catch((err)=>{
            console.log(err);
            Notification.error({
                title: "Hata",
                message: "Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz"
            })
        })
    }

    stop = ()=>{
        const {navigate} = this.props;
        this.props.AuthStore.getToken();
        const token = (this.props.AuthStore.appState !== null) ? this.props.AuthStore.appState.user.access_token : null;

        RestClient.postRequest(AppUrl.update,{
            url : null,
            channel : null
        },{
            headers : {
                "Authorization" : "Bearer "+token
            }
        }).then((res)=>{
            const result = res.data;

            if (result.success===false){
                Notification.error(result);
                navigate("/");
            }else{
                this.setState({
                    playUrl : null,
                    playChannel : null
                },()=>{
                    let userData = {
                        id : result.data.id,
                        name : result.data.name,
                        email : result.data.email,
                        url : result.data.url,
                        channel : result.data.channel,
                        access_token : result.data.access_token
                    }

                    let appState = {
                        "isLoggedIn" : true,
                        "user" : userData
                    }

                    this.props.AuthStore.saveToken(appState);
                });
            }

        }).catch((err)=>{
            console.log(err);
            Notification.error({
                title: "Hata",
                message: "Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz"
            })
        })
    }

    deleteFavourite = (id)=>{
       const {radios} = this.state;

       let newRadios = radios.filter((item,index)=>{
           return item.rd_id !== id;
       });

       this.setState({
           radios : newRadios
       },()=>{
           this.removeFavourite(id);
       });
    }

    removeFavourite = (id)=>{
        this.props.AuthStore.getToken();
        const token = (this.props.AuthStore.appState !== null) ? this.props.AuthStore.appState.user.access_token : null;

        RestClient.postRequest(AppUrl.remove_favourite,{
            fw_radio : id
        },{
            headers : {
                "Authorization" : "Bearer "+token
            }
        }).then((res)=>{}).catch((err)=>{
            console.log(err);
            Notification.error({
                title: "Hata",
                message: "Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz"
            })
        })
    }

    radioRender = (data) => {
        const {searchText,playUrl} = this.state;

        let newRadio = data.filter(item => {
            return item.rd_name.match(searchText);
        })

        if (newRadio.length>0){
            return newRadio.map((item, index) => {
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
                                        <i onClick={() => this.play(item.rd_link, item.rd_name)}
                                           className={`fas ${(playUrl === item.rd_link) ? 'fa-pause' : 'fa-play'} fa-2x text-gray-300`}></i>
                                        <i onClick={() => this.deleteFavourite(item.rd_id)}
                                           className={'fas fa-times ml-3 fa-2x text-danger'}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        } else {
            return (
                <div className={"container-fluid"}>
                    <div className={"col-md-12 alert alert-danger text-center"}>
                        Herhangi bir favori radyo kanalı bulunamadı
                    </div>
                </div>
            )
        }


    }

    render() {
        const {isLoading, radios,playUrl,playChannel} = this.state;

        if (isLoading) {
            return (
                <div className={"d-flex justify-content-center align-items-center vh-100"}>
                    <BarsSpinner size={30} color="#2250fc" loading={isLoading} />
                </div>
            )
        }

        return (
            <AuthLayout>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Favoriler | mRadio</title>
                </Helmet>

                <div id="wrapper">

                    <Sidebar/>

                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">

                            <Header/>

                            <div className="container-fluid">
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Favori Radyo Listesi
                                        {(playUrl!== null) && (
                                            <>
                                                <hr/>
                                                <p>Oynatılan Kanal: {playChannel}</p>
                                                <button onClick={()=>this.stop()} className={"btn btn-sm btn-danger"}>
                                                    Kapat
                                                </button>
                                            </>
                                        )}
                                    </h1>
                                </div>

                                <div className="row">
                                    <div className={"col-md-12 my-3"}>
                                        <input onChange={(e) => this.setState({searchText: e.target.value})}
                                               className={"form-control"} placeholder={"Favori Radyo ismi giriniz..."}/>
                                    </div>

                                    {(radios.length > 0) ? this.radioRender(radios) : (
                                        <div className={"container-fluid"}>
                                            <div className={"alert alert-danger text-center col-md-12"}>
                                                Herhangi bir favori radyo kanalı bulunamadı
                                            </div>
                                        </div>
                                    )}

                                    {(playUrl !== null) && (
                                        <>
                                            <AudioPlayer
                                                autoPlay
                                                src={playUrl}
                                                showJumpControls={false}
                                            />
                                        </>
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

export default withRouter(inject("AuthStore")(observer(Favourite)));
