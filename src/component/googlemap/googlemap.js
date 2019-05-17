import React from 'react';
//import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './googlemap.css';

// const style = {
//   width: '70%',
//   height: '50%'
// }

class myMap extends React.Component {


    componentDidMount(){
        console.log('initMapx',this.props.myLatProps);
        console.log("initMapY", this.props.myLonProps);
        //this.renderMap()
    }

    // renderMap(){
    //     loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCoyQTMWR5dEOWmtHhp6_4KIFfB4KkTTWU&callback=initMap")
    //     window.initMap = this.initMap;
    // }

    // initMap(){
    //     console.log('initMapx',this.props.myLatProps);
    //     console.log("initMapY", this.props.myLonProps);
    //     const map = new window.google.maps.Map(document.getElementById('map'), {
    //       center: {lat: this.props.myLatProps, lng: this.props.myLonProps},
    //       zoom: 15
    //     });
    // }

    render(){
        console.log('initMapRender',this.props.myLatProps);
        console.log("initMapRender", this.props.myLonProps);
        //console.log("selected",this.onInfoWindowClose);
        return (

                <div id="map"></div>

            )
    }
}
/*
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCoyQTMWR5dEOWmtHhp6_4KIFfB4KkTTWU&callback=initMap"
    async defer></script>
*/
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

export default myMap;

//x_coord: "31328.0300"
//y_coord: "35388.2500"