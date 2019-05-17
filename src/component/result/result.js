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
            return  <React.Fragment><div key={index} className="searchResultList"><p>Address: {carpark.address}</p><button className="resultBtn" onClick={()=>this.props.checkAvailabiltyHandlerProps(carpark,index)}>Check Availablity</button></div></React.Fragment>
         })
        return (
                <div>
                    <h1 className="resultHeader">Search Result</h1>
                     {addResults}
                </div>
            );
    }
}

export default result;