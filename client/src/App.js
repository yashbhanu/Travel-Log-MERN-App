import * as React from "react";
// import ReactMapGL from "react-map-gl";
import Map, { Marker , Popup} from "react-map-gl";
import RoomIcon from "@material-ui/icons/Room";
import Star from "@material-ui/icons/Star";
import './app.css';

function App() {
  const [viewport, setViewport] = React.useState({
    // width: "100vw",
    // height: "100vh",
    latitude: 46,
    longitude: 12,
    zoom: 4,
  });
  const [showPopup, setShowPopup] = React.useState(true);

  return (
    // <ReactMapGL
    //   {...viewport}
    //   mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    //   onViewportChange={(nextViewport) => setViewport(nextViewport)}
    // />
    <Map
      width="100%"
      height="100%"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      onViewState={(nextViewport) => setViewport(nextViewport)}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={-46} latitude={12} anchor="bottom" offsetLeft={-20 } offsetTop={-10}>
        <RoomIcon style={{ fontSize: viewport.zoom * 7, color: "orange" }} />
      </Marker>
      <Popup longitude={-46} latitude={12}
        anchor="left"
        closeButton={true}
        closeOnClick={true}
      >
        <div className="card">
          <label>Place</label>
          <h4 className="place">Eiffel Tower</h4>
          <label>Review</label>
          <p className="desc">Beautiful Place. I like it</p>
          <label>Rating</label>
          <div className="stars">
            <Star className="star" />
            <Star className="star" />
            <Star className="star" />
            <Star className="star" />
            <Star className="star" />
          </div>
          <label>Information</label>
          <span className="username">Created by <b>Yash </b></span>
          <span className="date">1 hour ago</span>
        </div>
      </Popup>
    </Map>
  );
}

export default App;
