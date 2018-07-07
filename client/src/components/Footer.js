import React from "react";
import footerLogo from "../styles/images/footer-logo.png"

class Footer extends React.Component {
    render() {
        return (
            <footer className="page-footer indigo darken-3">
                 <div className="footer-copyright">
                    <div className="container">
                        <div className="row">
                            <p className="footer-text grey-text text-lighten-4 left">© 2018 Triple Godzillas</p>
                            <span><a className="footer-text grey-text text-lighten-4 right" href="https://github.com/hurricaneronron/finalgroupproject" target="_blank"><img id="footer-logo" src={footerLogo} /> Contact Us</a></span>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;
