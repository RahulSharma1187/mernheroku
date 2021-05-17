import React from 'react'
import { NavLink } from 'react-router-dom'

const Errorpage = () => {
    return (
        <>
            <div id="notfound">
                <div className="notfound mt-5 ">
                    <div className="notfound-404">
                        <h1>404</h1>
                        <h2>We are sorry Page not found</h2>
                        <NavLink to="/">Go to Home Page</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Errorpage