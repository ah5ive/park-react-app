import React from 'react';
import './result.css';

class result extends React.Component {
    // constructor(){
    //   super();


    // };
    render() {
         console.log("===FilterResult===",this.props.filterResultProps);
         //console.log("xxx result props xxx",this.props.resultProps);
         const addResults = this.props.filterResultProps.map((carpark, index)=>{
            return  <li key={index}>Address: {carpark.address}<button className="resultBtn" onClick={()=>this.props.checkAvailabiltyHandlerProps(carpark,index)}>Check Availablity</button></li>
         })
        return (
            <React.Fragment>
                <h1 className="resultHeader">Search Result</h1>
                <ul className="searchResultList">
                  {addResults}
                </ul>
            </React.Fragment>
            );
    }
}

export default result;