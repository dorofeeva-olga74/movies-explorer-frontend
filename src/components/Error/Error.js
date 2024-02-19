import React from "react";
import { useLocation } from 'react-router-dom';

function Error({ error }) {  
    const location = useLocation(); 
    return (
        <span>                
            <p className={`error ${location.pathname === '/profile' ? 'error__profile' : ''}`}>{error}</p>
        </span>
    )
}

export default Error;