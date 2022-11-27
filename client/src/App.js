import * as React from "react";
// import ReactMapGL from "react-map-gl";
import Map, { Marker, Popup } from "react-map-gl";
import RoomIcon from "@material-ui/icons/Room";
import Star from "@material-ui/icons/Star";
import './app.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js"

function App() {

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 48.8584,
    longitude: 2.2945,
    zoom: 4,
  });
  // const [showPopup, setShowPopup] = React.useState(true);

  const currentUser = "Harry";
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  console.log(pins);

  useEffect(() => {
    const getPins = async () => {

      try {
        const res = await axios.get('/pins');
        console.log(res);
        setPins(res.data);
      }
      catch (err) {
        console.log(err);
      }
    }
    getPins();
  }, [])

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  }

  return (
    // <ReactMapGL
    //   {...viewport}
    //   mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    //   onViewportChange={(nextViewport) => setViewport(nextViewport)}
    // />
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      onViewStateChange={(nextViewport) => setViewport(nextViewport)}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >

      {pins.map(p => (
        <>
          <Marker longitude={p.long} latitude={p.lat} anchor="bottom" offsetLeft={-20} offsetTop={-10}>
            <RoomIcon style={{ fontSize: viewport.zoom * 7, color: p.username === currentUser ? "orangered" : "blueviolet" }}
              onClick={() => handleMarkerClick(p._id)} />
          </Marker>
          {p._id === currentPlaceId && (
            <Popup longitude={p.long} latitude={p.lat}
              anchor="left"
              closeButton={true}
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
            >
              <div className="card">
                <label>Place</label>
                <h4 className="place">{p.title}</h4>
                <label>Review</label>
                <p className="desc">{p.desc}</p>
                <label>Rating</label>
                <div className="stars">
                  <Star className="star" />
                  <Star className="star" />
                  <Star className="star" />
                  <Star className="star" />
                  <Star className="star" />
                </div>
                <label>Information</label>
                <span className="username">Created by <b>{p.username} </b></span>
                <span className="date">{format(p.createdAt)}</span>
              </div>
            </Popup>
          )}
        </>
      ))}
    </Map>
  );
}

export default App;
