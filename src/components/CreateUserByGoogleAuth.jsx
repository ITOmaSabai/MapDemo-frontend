
const CreateUserByGoogleAuth = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_RAILS_API_ENDPOINT}/api/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: {
        name: name,
        uid: uid,
        // avatar: avatar
      } }),
    });
    if (!response.ok) {
      throw new Error('データの送信に失敗しました');
    }
    const data = await response.json();
    // console.log('保存成功:', data);
  } catch (error) {
    console.error('エラー:', error);
  }
};

export default CreateUserByGoogleAuth;