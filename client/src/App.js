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
    latitude: 48.8584,
    longitude: 2.2945,
    zoom: 4,
  });
  // const [showPopup, setShowPopup] = React.useState(true);

  const currentUser = "Harry";
  const [pins, setPins] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
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

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long })
  }

  const handleAddLocation = (e) => {
    console.log(e);
    const longLat = e.lngLat;
    const long = longLat.lng;
    const lat = longLat.lat;
    console.log(long);
    console.log(lat);
    setNewPlace({
      long, lat
    });
    console.log(newPlace);
  };

  return (
    // <ReactMapGL
    //   {...viewport}
    //   mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    //   onViewportChange={(nextViewport) => setViewport(nextViewport)}
    // />
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      style={{ width: "100vw", height: "100vh" }}
      // width="100%" height="100%"
      mapStyle="mapbox://styles/mapbox/streets-v9"
      doubleClickZoom={false}
      onDblClick={handleAddLocation}
      transitionDuration="200"
    >
      {pins.map((p) => (
        <>
          <Marker longitude={p.long} latitude={p.lat} anchor="bottom" offsetLeft={-20} offsetTop={-10}>
            <RoomIcon style={{ fontSize: viewport.zoom * 7, color: p.username === currentUser ? "orangered" : "blueviolet", cursor: "pointer" }}
              onClick={() => handleMarkerClick(p._id, p.lat, p.long)} />
          </Marker>
          {p._id === currentPlaceId && (
            <Popup longitude={p.long} latitude={p.lat}
              anchor="left"
              closeButton={true}
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
            >
              <div className="card">
                <label className="card-label">Place</label>
                <h4 className="place">{p.title}</h4>
                <label className="card-label">Review</label>
                <p className="desc">{p.desc}</p>
                <label className="card-label">Rating</label>
                <div className="stars">
                  <Star className="star" />
                  <Star className="star" />
                  <Star className="star" />
                  <Star className="star" />
                  <Star className="star" />
                </div>
                <label className="card-label">Information</label>
                <span className="username">Created by <b>{p.username} </b></span>
                <span className="date">{format(p.createdAt)}</span>
              </div>
            </Popup>
          )}
        </>
      ))}
      {newPlace && (
        <Popup longitude={newPlace.long} latitude={newPlace.lat}
          anchor="left"
          closeButton={true}
          closeOnClick={false}
          onClose={() => setCurrentPlaceId(null)}
        >
          <div>
            <form>
              <label className="form-label">Title</label>
              <input placeholder="Enter a title" />
              <label className="form-label">Review</label>
              <textarea placeholder="Add Review about this place" />
              <label className="form-label">Rating</label>
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button type="submit" className="submitButton">Add Pin</button>
            </form>
          </div>
        </Popup>
      )}
    </Map>
  );
}

export default App;
