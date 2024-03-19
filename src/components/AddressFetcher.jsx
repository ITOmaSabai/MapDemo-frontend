import React, { useEffect } from 'react';
import { useContext } from 'react';
import SetAddressesContext from '../contexts/SetAddressesContext';
import SavedMarkerContext from '../contexts/SavedMarkerContext';
import SelectedAddressContext from '../contexts/SelectedAddressContext';
import SelectedMarkerContext from '../contexts/SelectedMarkerContext';
import { useDataPosted } from '../contexts/DataPostedContext';

// 保存済みの全てのAddress情報を取得する
const AddressFetcher = () => {
  const { selectedMarker } = useContext(SelectedMarkerContext);
  const { isDataPosted } = useDataPosted();
  const { addresses, setAddresses } = useContext(SetAddressesContext);
  const { savedMarkers } = useContext(SavedMarkerContext);
  const { selectedAddress, setSelectedAddress } = useContext(SelectedAddressContext);

  useEffect(() => {
    // fetch('https://mapdemo-backend.onrender.com/api/v1/addresses')
    fetch(`${process.env.REACT_APP_RAILS_API_ENDPOINT}/api/v1/addresses`)
      .then(response => response.json())
      .then(data => setAddresses(data))
      .catch(error => console.error('Error:', error));
  }, [isDataPosted, savedMarkers]);

  // selectedMarkerと同じmap_idを持つAddressを全てのAddressを保持したaddressの中から探し出す
  useEffect(() => {
    const matchedAddresses = addresses ? addresses.find(address => address.map_id === selectedMarker) : "";
    setSelectedAddress(matchedAddresses);
  }, [selectedMarker, addresses, isDataPosted, setSelectedAddress ]);

};

export default AddressFetcher;