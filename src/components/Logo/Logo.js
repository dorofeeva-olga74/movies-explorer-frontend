import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg"

function Logo({onFocus}) {

    return (
        <div>
            <Link to="/" onFocus={onFocus}>
                <img className="logo" src={logo} alt="Логотип сайта" />
            </Link>
        </div>
    )
}

export default Logo;