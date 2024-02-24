import React, { useContext, useEffect, useState } from 'react';
import SpotContext from '../contexts/SpotContext';

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
      console.log(markers)
    }
  }, [markers]); // 依存配列にmarkersを入れて、markersが変更されたときだけこのeffectを実行する

  const handleSubmit = (e) => {
    e.preventDefault();
    // 送信するピンのデータを準備
    const pinData = { name, description, latitude, longitude };
    // 親コンポーネントのonSubmitハンドラーを呼び出し、ピンのデータを渡す
    onSubmit(pinData);
    // フォームをリセット
    setName('');
    setDescription('');
    setLatitude('');
    setLongitude('');
  };

  return (
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
  );
}

export default PostSpotForm;