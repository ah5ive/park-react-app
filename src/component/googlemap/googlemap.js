import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './googlemap.css';

const style = {
  width: '70%',
  height: '50%'
}

class myMap extends React.Component {

    render(){
        console.log("google", this.props.google);
        console.log("selected",this.onInfoWindowClose);
        return (
            <div className="map">
                <Map
                google={this.props.google}
                zoom={14}
                style={style}
                initialCenter={{
                lat: 1.331978,
                lng: 103.8670783
          }}>

                <Marker
                    position = {{
                    lat: 1.331978,
                    lng: 103.8670783
                }}
                    onClick={this.onMarkerClick}
                    name={'HAHHA'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                <h2>HAHAHAH</h2>
                </InfoWindow>
                </Map>
            </div>
            )
    }
}

export default GoogleApiWrapper ({
  apiKey: ('AIzaSyCoyQTMWR5dEOWmtHhp6_4KIFfB4KkTTWU')
})(myMap)

//x_coord: "31328.0300"
//y_coord: "35388.2500"