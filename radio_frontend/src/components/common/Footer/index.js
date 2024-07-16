import React, {Component} from 'react'

class Footer extends Component {

    constructor(props) {
        super(props);
    }

    handleScroll = ()=>{
        window.scrollTo({
            top : 0,
            left : 0,
            behavior : "smooth"
        })
    }

    render() {
        return (
            <>
                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Tüm Hakları Saklıdır &copy; mRadio {new Date().getFullYear()}</span>
                        </div>
                    </div>

                    <a className="scroll-to-top rounded" onClick={()=>this.handleScroll()}>
                        <i className="fas fa-angle-up"></i>
                    </a>
                </footer>
            </>
        )
    }
}

export default Footer;
