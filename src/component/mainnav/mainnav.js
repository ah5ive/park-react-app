import React from 'react';
import { NavLink } from 'react-router-dom';
import './mainnav.css';

class mainNav extends React.Component {
    // constructor(props){
    //     super(props)

    // };
    render(){

        return(
        <header>
            <nav className="navBarMain" >
            <ul>
                <li>
                    <NavLink to="/" onClick={this.props.resetAllProps}>Home</NavLink>
                </li>
            </ul>
            </nav>
        </header>
        )

    }

}
export default mainNav;