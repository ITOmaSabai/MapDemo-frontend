import React, { useEffect } from 'react';
import { useContext } from 'react';
import SetAddressesContext from '../contexts/SetAddressesContext';

const AddressFetcher = () => {
  const { setAddresses } = useContext(SetAddressesContext);

  useEffect(() => {
    // fetch('https://mapdemo-backend.onrender.com/api/v1/addresses')
    fetch('http://localhost:3000/api/v1/addresses')
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => console.error('Error:', error));
  }, [setAddresses, isDataPosted]);

};

export default AddressFetcher;