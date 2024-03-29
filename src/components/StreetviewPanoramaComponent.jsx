import { useMapsLibrary, StreetViewPanorama } from "@vis.gl/react-google-maps";
import { useContext, useEffect, useState } from "react";
import SpotContext from "../contexts/SpotContext";

const StreetviewPanoramaComponent = () => {
  const streetviewPanoramaLibrary = useMapsLibrary("streetView");
  const {markers, setMarkers} = useContext(SpotContext);
  const [positionForStreetViewPanoramaOption, setPositionForStreetViewPanoramaOption] = useState(null);

  useEffect(() => {
    if (!streetviewPanoramaLibrary) return;
    
    new streetviewPanoramaLibrary.StreetViewPanorama(
      document.getElementById("street-view"),
      streetViewPanoramaOption
    )
  }, [positionForStreetViewPanoramaOption]);

  useEffect(() => {
    setPositionForStreetViewPanoramaOption(markers);
  }, [markers]);

  const streetViewPanoramaOption = {
    position: { 
      lat: positionForStreetViewPanoramaOption?.lat,
      lng: positionForStreetViewPanoramaOption?.lng
    },
    pov: { heading: 165, pitch: 0 },
    zoom: 1
  }

  return (
    <div id="street-view" style={{height: "50vh", width: "100%"}}>
    </div>
  )
}

export default StreetviewPanoramaComponent;