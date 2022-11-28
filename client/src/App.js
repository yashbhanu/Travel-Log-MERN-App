import * as React from "react";
import Map from "react-map-gl";
import './app.css';
import { useState, useEffect } from "react";
import axios from "axios";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Pin from "./Components/Pin";
import NewPlace from "./Components/NewPlace";

function App() {

  const [viewport, setViewport] = useState({
    latitude: 48.8584,
    longitude: 2.2945,
    zoom: 4,
  });

  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get('/pins');
        setPins(res.data);
      }
      catch (err) {
      }
    }
    getPins();
  }, [])

  const handleAddLocation = (e) => {
    const longLat = e.lngLat;
    const long = longLat.lng;
    const lat = longLat.lat;
    setNewPlace({
      long, lat
    });
  };

  const handleLogout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  }

  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      doubleClickZoom={false}
      onDblClick={currentUser && handleAddLocation}
      transitionDuration="200"
    >
      {pins.map((p) => (
        <Pin key={p._id} p={p} viewport={viewport} setViewport={setViewport} currentUser={currentUser} />
      ))}

      {newPlace && (
        <NewPlace setNewPlace={setNewPlace} newPlace={newPlace} pins={pins} setPins={setPins} currentUser={currentUser} />
      )};

      {currentUser ? (
        <button className="button logout" onClick={handleLogout}>Sign Out</button>
      ) : (
        <div className="buttons">
          <button className="button login" onClick={() => setShowSignIn(true)}>Sign In</button>
          <button className="button register" onClick={() => setShowSignUp(true)}>Sign Up</button>
        </div>
      )}

      {showSignIn && <SignIn setShowSignIn={setShowSignIn} myStorage={myStorage} setCurrentUser={setCurrentUser} />}
      {showSignUp && <SignUp setShowSignUp={setShowSignUp} />}
    </Map>
  );
}

export default App;
