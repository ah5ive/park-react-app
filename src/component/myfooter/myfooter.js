import React from 'react';
import './myfooter.css';

class myFooter extends React.Component {

        render(){

        return (
                <div className="footerDiv">
                    <h3>{this.props.messageProps}</h3>
                </div>
            )
    }

}

export default myFooter;