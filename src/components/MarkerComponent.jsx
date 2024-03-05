import React, { useContext } from 'react';
import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import SpotContext from '../contexts/SpotContext';

const MarkerComponent = (position) => {
  const {markers} = useContext(SpotContext);

  return (
    <AdvancedMarker
      position={markers}
      title={'AdvancedMarker with customized pin.'}>
      <Pin
        background={'#FF6600'}
        // borderColor={'#1e89a1'}
        // glyphColor={'#0f677a'}
      >
          You
      </Pin>
    </AdvancedMarker>
  )
};

export default MarkerComponent;