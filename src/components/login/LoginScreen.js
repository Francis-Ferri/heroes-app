import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const LoginScreen = ({ history }) => {
    
    const { dispatch } = useContext( AuthContext );

    const handleClick = () => {
        // history.push('/');
        // history.replace('/'); // Podria ponerse aqui tambien
        dispatch({
            type: types.login,
            payload: {
                name: "Francis Ferri"
            }
        });
        // Esta tarea es asincrona por lo que noo importa donde se ponga se ejecutara despues del dispatch o almenos eso entendí
        // history.replace('/'); 
        const lastPath = localStorage.getItem("lastPath") || "/";
        history.replace(lastPath);
    };

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <hr />
            <button className="btn btn-primary" onClick={ handleClick }>
                Login
            </button>
        </div>
    )
}
