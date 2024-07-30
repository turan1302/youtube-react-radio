import React, {Component} from 'react'
import {Link} from "react-router-dom";
import withRouter from "../../withRouter";
import {Formik} from "formik";
import * as Yup from "yup";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Notification from "../../RestAPI/Notification";
import {Helmet} from "react-helmet";

class Register extends Component {

    constructor(props) {
        super(props);
    }

    _handleSubmit = (values, {resetForm, setSubmitting}) => {
        const {navigate} = this.props;

        RestClient.postRequest(AppUrl.register,values).then((res)=>{
            const status = res.status;
            const result = res.data;

            if (status===201){
                resetForm();
                setSubmitting(false);
                Notification.success(result);
                navigate("/login");
            }else{
                if (status===422){
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
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Kayıt Ol | mRadio</title>
                </Helmet>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-12 col-md-9">
                            <div className="card o-hidden border-0 shadow-lg my-5">
                                <div className="card-body p-0">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="p-5">
                                                <div className="text-center">
                                                    <h1 className="h4 text-gray-900 mb-4">mRadio Kayıt</h1>
                                                </div>
                                                <Formik initialValues={{
                                                    name: '',
                                                    email: '',
                                                    password: '',
                                                    password_confirmation: ''
                                                }}
                                                        validationSchema={Yup.object().shape({
                                                            name: Yup.string().required("Ad soyad alanı zorunludur"),
                                                            email: Yup.string().required("E-Mail alanı zorunludur").email("Lütfen geçerli bir E-Mail adresi giriniz"),
                                                            password: Yup.string().required("Şifre alanı zorunludur").min(8, "Şifreniz minimum 8 karakter olmak zorundadır").max(16, "Şifreniz maksimum 16 karakter olmak zorundadır"),
                                                            password_confirmation: Yup.string().required("Şifre tekrar alanı zorunludur").oneOf([Yup.ref("password"), null], "Şifreler eşleşmiyor")
                                                        })}
                                                        onSubmit={this._handleSubmit}>
                                                    {({touched,values,errors,handleBlur,handleChange,handleSubmit,isValid,isSubmitting}) => (
                                                        <form className="user">
                                                            <div className="form-group">
                                                                <input name={"name"} onChange={handleChange('name')} onBlur={handleBlur} value={values.name} type="text"
                                                                       className="form-control form-control-user"
                                                                       placeholder="Adınız Soyadınız..."/>
                                                                {(touched.name && errors.name) && <small style={{color : "red"}}>{errors.name}</small>}
                                                            </div>
                                                            <div className="form-group">
                                                                <input name={"email"} onChange={handleChange('email')} onBlur={handleBlur} value={values.email} type="text"
                                                                       className="form-control form-control-user"
                                                                       placeholder="E-Mail Adresiniz..."/>
                                                                {(touched.email && errors.email) && <small style={{color : "red"}}>{errors.email}</small>}
                                                            </div>
                                                            <div className="form-group">
                                                                <input name={"password"} onChange={handleChange('password')} onBlur={handleBlur} value={values.password} type="password"
                                                                       className="form-control form-control-user"
                                                                       placeholder="Şifreniz..."/>
                                                                {(touched.password && errors.password) && <small style={{color : "red"}}>{errors.password}</small>}
                                                            </div>
                                                            <div className="form-group">
                                                                <input name={"password_confirmation"} onChange={handleChange('password_confirmation')} onBlur={handleBlur} value={values.password_confirmation} type="password"
                                                                       className="form-control form-control-user"
                                                                       placeholder="Şifreniz (Tekrar)..."/>
                                                                {(touched.password_confirmation && errors.password_confirmation) && <small style={{color : "red"}}>{errors.password_confirmation}</small>}
                                                            </div>
                                                            <button disabled={(!isValid || isSubmitting)} onClick={handleSubmit} className="btn btn-primary btn-user btn-block">
                                                                Kayıt Ol
                                                            </button>
                                                            <hr/>
                                                        </form>
                                                    )}
                                                </Formik>
                                                <div className="text-center">
                                                    <Link to={"/login"} className="small">Zaten hesabın var mı ? Giriş
                                                        Yap</Link>
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

export default withRouter(Register);
