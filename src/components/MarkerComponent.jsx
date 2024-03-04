import React, { useContext } from 'react';
import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import SpotContext from '../contexts/SpotContext';

const MarkerComponent = (position) => {
  const {markers} = useContext(SpotContext);

  return (
<AdvancedMarker
          position={markers}
          title={'AdvancedMarker with customized pin.'}>
          <Pin background={'#22ccff'} borderColor={'#1e89a1'} scale={1.4}>
            {/* children are rendered as 'glyph' of pin */}
            👀
          </Pin>
        </AdvancedMarker>
  )
};

export default MarkerComponent;