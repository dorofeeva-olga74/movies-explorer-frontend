import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    return (
        <div className='notFound'>
            <div className='notFound__container'>
                <h2 className='notFound__title'>404</h2>
                <p className='notFound__text'>Страница не найдена</p>                
            </div>
            <button className='notFound_link' onClick={() => navigate(-1)}>Назад</button>
        </div >
    )
}

export default NotFound;