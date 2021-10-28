import React from 'react'
import PropTypes from 'prop-types'


export default function Navbar(props) {
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark  "  id="nav">
            <div className="container-fluid ">
                <a className="navbar-brand text-justify" href="/">{props.title}</a>
                {/* <h2 className="navbar-brand text-justify">{props.title}</h2> */}
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    aboutText: PropTypes.string
    // aboutText : PropTypes.string,
}

Navbar.defaultProps = {
    // title:"Set Title Here",
    aboutText: "About Text here"
}