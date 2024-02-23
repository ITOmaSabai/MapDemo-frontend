import React, { useState } from 'react';

const PostSpotForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

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
        <label>緯度:</label>
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
      </div>
      <div>
        <label>経度:</label>
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
      </div>
      <button type="submit">ピンを追加</button>
    </form>
  );
}

export default PostSpotForm;