
import { Player } from "@lottiefiles/react-lottie-player";
import GoogleMapMarker from '../animations/GoogleMapMarker.json';

const TopAnimation = () => {
  return (
    <Player
      autoplay
      src={GoogleMapMarker}
      speed={0.7}
      keepLastFrame
      style={{
        // position: "fixed",
        // top: "50%",
        // left: "13%",
        // transform: "translate(-50%, -50%)",
        height: "200px",
        width: "200px",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  )
};

export default TopAnimation;