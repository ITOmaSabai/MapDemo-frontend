import React, { useState } from "react";
import MapComponent from "./MapComponent";
import MarkerComponent from "./MarkerComponent";

const MarkerPostComponent = ({ zoom, position }) => {
  const [markers, setMarkers] = useState([]);

  const handleMapClick = (e) => {
    const lat = parseFloat(e.detail.latLng.lat);
    const lng = parseFloat(e.detail.latLng.lng);
    setMarkers([...markers, { lat, lng }]);
  };

  return (
    <div>
      <MapComponent zoom={zoom} center={position} onClick={handleMapClick} >
      {/* {markers.map((marker, index) => ( */}
        {/* // <MarkerComponent key={index} position={marker} /> */}
      {/* // ))} */}
      </MapComponent>
    </div>
  );
};

export default MarkerPostComponent;