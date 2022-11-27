import * as React from "react";
// import ReactMapGL from "react-map-gl";
import Map, { Marker } from "react-map-gl";
import RoomIcon from "@material-ui/icons/Room";
function App() {
  const [viewport, setViewport] = React.useState({
    width: "100vw",
    height: "100vh",
    latitude: 46,
    longitude: 12,
    zoom: 4,
  });

  return (
    // <ReactMapGL
    //   {...viewport}
    //   mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    //   onViewportChange={(nextViewport) => setViewport(nextViewport)}
    // />
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      onViewState={(nextViewport) => setViewport(nextViewport)}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={-46} latitude={12} anchor="bottom">
        <RoomIcon />
      </Marker>
    </Map>
  );
}

export default App;
