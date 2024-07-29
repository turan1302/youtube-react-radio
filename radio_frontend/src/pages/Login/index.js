import React, {Component} from 'react'
import {Link} from "react-router-dom";
import withRouter from "../../withRouter";
import {inject, observer} from "mobx-react";
import {Formik} from "formik";
import * as Yup from "yup";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Notification from "../../RestAPI/Notification";

class Login extends Component {

    constructor(props) {
        super(props);
    }

    _handleSubmit = (values, {resetForm, setSubmitting}) => {
        const {navigate} = this.props;

        RestClient.postRequest(AppUrl.login,values).then((res)=>{
            const status = res.status;
            const result = res.data;

            if (status===200){
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
                resetForm();
                setSubmitting(false);
                Notification.success(result);
                navigate("/");
            }else{
                if (status===422){
                    Notification.error(result);
                    setSubmitting(false);
                }else if (status===401){
                    Notification.error(result);
                    setSubmitting(false);
                }else{
                    Notification.error(result);
                    setSubmitting(false);
                }
            }

        }).catch((err)=>{
            console.log(err);
            Notification.error({
                title : "Hata",
                message : "Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz"
            });
            setSubmitting(false);
        })
    }

    render() {
        return (
            <>
                <div className="container">

                    <div className="row justify-content-center">

                        <div className="col-xl-8 col-lg-12 col-md-9">

                            <div className="card o-hidden border-0 shadow-lg my-5">
                                <div className="card-body p-0">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="p-5">
                                                <div className="text-center">
                                                    <h1 className="h4 text-gray-900 mb-4">mRadio Giriş</h1>
                                                </div>
                                                <Formik initialValues={{
                                                    email: '',
                                                    password: ''
                                                }}
                                                        validationSchema={Yup.object().shape({
                                                            email: Yup.string().required("E-Mail alanı zorunludur").email("Lütfen geçerli bir E-Mail adresi giriniz"),
                                                            password: Yup.string().required("Şifre alanı zorunludur").min(8, "Şifreniz minimum 8 karakter olmak zorundadır").max(16, "Şifreniz maksimum 16 karakter olmak zorundadır"),
                                                        })}
                                                        onSubmit={this._handleSubmit}>
                                                    {({values,errors,touched,handleChange,handleBlur,handleSubmit,isValid,isSubmitting}) => (
                                                        <form className="user">
                                                            <div className="form-group">
                                                                <input name={"email"} value={values.email} onChange={handleChange('email')} onBlur={handleBlur} type="text"
                                                                       className="form-control form-control-user"
                                                                       placeholder="E-Mail Adresiniz..."/>
                                                                {(errors.email && touched.email) && <small style={{color : "red"}}>{errors.email}</small>}
                                                            </div>
                                                            <div className="form-group">
                                                                <input name={"password"} value={values.password} onChange={handleChange('password')} onBlur={handleBlur} type="password"
                                                                       className="form-control form-control-user"
                                                                       placeholder="Şifreniz..."/>
                                                                {(errors.password && touched.password) && <small style={{color : "red"}}>{errors.password}</small>}
                                                            </div>
                                                            <button disabled={(!isValid || isSubmitting)} onClick={handleSubmit} className="btn btn-primary btn-user btn-block">
                                                                Giriş Yap
                                                            </button>
                                                            <hr/>
                                                        </form>
                                                    )}
                                                </Formik>
                                                <div className="text-center">
                                                    <Link to={"/register"} className="small">Henüz hesabın yok mu ?
                                                        Kayıt Ol</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </>
        )
    }
}

export default withRouter(inject("AuthStore")(observer(Login)));
