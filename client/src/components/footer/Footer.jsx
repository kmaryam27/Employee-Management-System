import React from 'react';
import './Footer.css';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '260px',
    height: '260px'
  };

  const Footer = props => (
    <footer>
        <div className="right-align map-loc">
            <Map  /*className="map-loc"*/
                    google={props.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={{
                    lat: 33.925697,
                    lng: -84.380094
                    }}
                />
        </div> 
       <div className="left-align">
            <p>Final project In georgia Tech Global Learning Center</p>
            <p> Employee Management system MERN Application </p>
            <p>by: <strong>Maryam keshavarz</strong> </p>
            <h4>Instuctors: </h4>
            <p><a href="https://github.com/hannahpatellis">Hannah Patellis</a></p>
            <p><a href="https://github.com/CjJordan">Cj Jordan</a></p> 
        </div>
         {/* 
        <div  className="left-align">
           
        </div>
        <div className="left-align">
            <p><i className="fa fa-at mr-3">Heroku: </i><a href="https://final-mongo.herokuapp.com/">https://final-mongo.herokuapp.com/</a></p>
        </div>
        
        <div className="center-align">
            <hr/>
            <p className="text-center text-md-left">© 2019 Copyright: <strong>Maryam Keshavarz</strong></p>
        </div>   */}
      </footer>
  )

  export default GoogleApiWrapper({
    apiKey: 'AIzaSyD0KXmC5gFadBpK5eQEdAuzTW4PJvoKiw4'
  })(Footer);

