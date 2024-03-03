import { useMapsLibrary, StreetViewPanorama } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

const StreetviewPanoramaComponent = () => {
  const streetviewPanoramaLibrary = useMapsLibrary("streetView");
  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (!streetviewPanoramaLibrary) return;
    
    new streetviewPanoramaLibrary.StreetViewPanorama(
      document.getElementById("street-view"),
      streetViewPanoramaOption
    )
  }, [streetviewPanoramaLibrary]);

    const streetViewPanoramaOption = {
      position: { lat: 37.86926, lng: -122.254811 },
      pov: { heading: 165, pitch: 0 },
      zoom: 1
    }

  return (
    <div id="street-view" style={{height: "50vh", width: "100%"}}>
    </div>
  )
}

export default StreetviewPanoramaComponent;