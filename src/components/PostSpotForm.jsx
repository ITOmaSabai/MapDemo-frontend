import React, { useContext, useEffect, useState } from 'react';
import SpotContext from '../contexts/SpotContext';
import ReverseGeocodingComponent from './ReverseGeocodingComponent';

const PostSpotForm = ({ onSubmit }) => {
  const { markers } = useContext(SpotContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState(markers ? markers.lat : '');
  const [longitude, setLongitude] = useState(markers ? markers.lng : '');

  // markersが変更されたときに実行される
  useEffect(() => {
    if (markers) {
      setLatitude(markers.lat);
      setLongitude(markers.lng);
    }
  }, [markers]); // 依存配列にmarkersを入れて、markersが変更されたときだけこのeffectを実行する

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postSpotData(name, description, latitude, longitude);
  };

  const postSpotData = async (name, description, latitude, longitude) => {
    try {
      const response = await fetch('/api/v1/maps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ map: {name: name, description: description, lat: latitude, lng: longitude } }),
      });
      if (!response.ok) {
        throw new Error('データの送信に失敗しました');
      }
      const data = await response.json();
      console.log('保存成功:', data);
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  return (
    <div>
    <ReverseGeocodingComponent lat={latitude} lng={longitude}></ReverseGeocodingComponent>

    <form onSubmit={handleSubmit}>
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
      <button type="submit">ピンを追加</button>
    </form>

    </div>
  );
}

export default PostSpotForm;