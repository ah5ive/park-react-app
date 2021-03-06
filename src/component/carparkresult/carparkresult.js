import React from 'react';
//import Googlemap from '../googlemap/googlemap';
// import * as d3 from 'd3';
import './carparkresult.css';

class carparkResult extends React.Component {
    constructor(props){
        super(props);
        this.getLatLong = this.getLatLong.bind( this );
        this.initMap = this.initMap.bind( this );
        this.renderMap = this.renderMap.bind( this );
        this.state = {
            myLat: null,
            myLon: null
        };
    }


    componentDidMount(){
        this.getLatLong();

    }

    getLatLong(event){
        var xCoord = parseInt(this.props.singleCarParkProps.x_coord);
        var yCoord = parseInt(this.props.singleCarParkProps.y_coord);
        const xyBaseURL = 'https://developers.onemap.sg/commonapi/convert/3414to4326?X=' + xCoord +'&Y=' + yCoord;
        //console.log("GETLATLONG");
        fetch(xyBaseURL,{
            method:'GET',
        })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            var reactThis = this;
            reactThis.setState({myLat: data.latitude, myLon: data.longitude});
            //console.log("DATALATLON",data);
            console.log("MYLAT",this.state.myLat);
            console.log("MYLON", this.state.myLon);
            this.renderMap();
        })
    }
    //renderMap
    renderMap(){
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCoyQTMWR5dEOWmtHhp6_4KIFfB4KkTTWU&callback=initMap")
        window.initMap = this.initMap;
    }
    //create map
    initMap(){
        console.log('initMapx',this.props.myLatProps);
        console.log("initMapY", this.props.myLonProps);
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: this.state.myLat, lng: this.state.myLon},
          zoom: 18
        });
        const marker = new window.google.maps.Marker({
          position: {lat: this.state.myLat, lng: this.state.myLon},
          map: map,
          title:this.props.singleCarParkProps.address,
        });
    }

    render() {
        let loading = <p>Loading...</p>;
        if (Object.keys(this.props.finalResultProps).length < 1) {
           return loading
        } else {
            loading = ""
        }
        console.log("singlecarpark",this.props.singleCarParkProps)
        console.log(this.props.finalResultProps,"carparkresult");
        const singleCarPark = this.props.singleCarParkProps;
        const finalResult = this.props.finalResultProps.map((carpark, index)=>{
            return  <li key={index}><span className="titleHightlight">Lot Type:</span> {carpark.carpark_info[0].lot_type}<br/><span className="titleHightlight">Total Lot:</span> {carpark.carpark_info[0].total_lots} <br/><span className="titleHightlight">Lot Available:</span> {carpark.carpark_info[0].lots_available}</li>
         })
        return(
            <div className="carParkResult">
                {loading}
                <h2>Car Park Search Result</h2>
                <h3>{singleCarPark.address}</h3>
                <p>
                    <span className="titleHightlight">Car Park Type:</span> {singleCarPark.car_park_type}<br/>
                    <span className="titleHightlight">Free Parking:</span>  {singleCarPark.free_parking}<br/>
                    <span className="titleHightlight">Parking System:</span> {singleCarPark.type_of_parking_system}
                </p>
                <ul>
                    {finalResult}
                </ul>
                 <div id="map"></div>
             </div>
            )
    }
}
//load google api using function
function loadScript(url){
    //var index is to getElements of the first Sctipt tag
    var index = window.document.getElementsByTagName("script")[0];
    //var script is to create a script tag
    var script = window.document.createElement("script");
    //create a source
    script.src = url;
    script.async = true;
    script.defer = true;
    //select the index reference the first script tag, select the parent node and insert the script before it.
    index.parentNode.insertBefore(script, index);

}

export default carparkResult;