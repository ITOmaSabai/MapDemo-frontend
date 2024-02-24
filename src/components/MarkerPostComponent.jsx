import React, { useState } from "react";
import MapComponent from "./MapComponent";
import MarkerComponent from "./MarkerComponent";

const MarkerPostComponent = ({ zoom, position }) => {
  const [markers, setMarkers] = useState([]);

  const handleMapClick = (event) => {
    const lat = parseFloat(event.detail.latLng.lat);
    const lng = parseFloat(event.detail.latLng.lng);
    setMarkers([...markers, { lat, lng }]);
    // console.log({lat, lng})
    // console.log(event)
    // console.log(markers)
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