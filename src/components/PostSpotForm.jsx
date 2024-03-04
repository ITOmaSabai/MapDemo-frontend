import React, { useContext, useEffect, useState } from 'react';
import SpotContext from '../contexts/SpotContext';
import ReverseGeocodingComponent from './ReverseGeocodingComponent';
import { useDataPosted } from '../contexts/DataPostedContext';
import SelectedMarkerContext from '../contexts/SelectedMarkerContext';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const PostSpotForm = ({ onSubmit }) => {
  const { markers } = useContext(SpotContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState(markers ? markers.lat : '');
  const [longitude, setLongitude] = useState(markers ? markers.lng : '');
  const [addressComponents, setAddressComponents] = useState('');
  const [formattedAddres, setFormattedAddres] = useState('');
  const { setIsDataPosted } = useDataPosted();
  const { setSelectedMarker } = useContext(SelectedMarkerContext);

  useEffect(() => {
    if (markers) {
      setLatitude(markers.lat);
      setLongitude(markers.lng);
    }
  }, [markers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postSpotData(name, description, latitude, longitude, addressComponents, formattedAddres );
    setIsDataPosted(true);
  };

  const postSpotData = async (name, description, latitude, longitude, addressComponents, formattedAddres) => {
    try {
      const response = await fetch('https://mapdemo-backend.onrender.com/api/v1/maps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ map: {
          name: name, 
          description: description, 
          lat: latitude, 
          lng: longitude,
          address_components: addressComponents,
          formatted_addres: formattedAddres
        } }),
      });
      if (!response.ok) {
        throw new Error('データの送信に失敗しました');
      }
      const data = await response.json();
      console.log('保存成功:', data);
      setSelectedMarker(data.map.id);
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  return (
    <div>
        <ReverseGeocodingComponent
          lat={latitude}
          lng={longitude}
          onSetAddressComponentsChange={setAddressComponents}
          onSetFormattedAddressChange={setFormattedAddres}
        >
        </ReverseGeocodingComponent>

    <form onSubmit={handleSubmit}>
      <Stack direction="column" spacing={1} useFlexGap flexWrap={"wrap"}>
      <div>
        <label>スポット名:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>説明:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        {/* <label>緯度:</label> */}
        <input
          type="hidden"
          value={latitude}
          name="latitude"
        />
      </div>
      <div>
        {/* <label>経度:</label> */}
        <input
          type="hidden"
          value={longitude}
          name="longitude"
        />
      </div>
      <div>
        {/* <label>address_components:</label> */}
        {/* <input
          type="hidden"
          value={addressComponents}
          name="addressComponents"
        /> */}
      </div>
      {/* <button type="submit">ピンを追加</button> */}
      <Button variant="outlined" color="success" type="submit">
         街を歩いてみる(動画を取得します)
      </Button>
    </Stack>
    </form>

    </div>
  );
}

export default PostSpotForm;