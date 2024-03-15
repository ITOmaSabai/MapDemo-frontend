import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { IsAuthProvider } from './contexts/IsAuthContext';
import { SetAddressesProvider } from './contexts/SetAddressesContext';
import { SelectedAddressProvider } from './contexts/SelectedAddressContext';
import { IsSavedMarkerSelectedProvider } from './contexts/IsSavedMarkerSelectedContext';
import { IsNewMarkerSelectedProvider } from './contexts/IsNewMarkerSelectedContext';
import { DialogOpenProvider } from './contexts/DialogOpenContext';
import { IsTopInfoVisibleProvider } from './contexts/IsTopInfoVisibleContext';
import { ReverseGeocodedAddressProvider } from './contexts/ReverseGeocodedAddressContext';
import { IsConfirmSaveSpotModalOpenContextProvider } from './contexts/IsConfirmSaveSpotModalOpenContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <IsAuthProvider>
      <SelectedAddressProvider>
        <SetAddressesProvider>
          <IsSavedMarkerSelectedProvider>
            <IsNewMarkerSelectedProvider>
              <DialogOpenProvider>
                <IsTopInfoVisibleProvider>
                  <ReverseGeocodedAddressProvider>
                    <IsConfirmSaveSpotModalOpenContextProvider>
                      <App />
                    </IsConfirmSaveSpotModalOpenContextProvider>
                  </ReverseGeocodedAddressProvider>
                </IsTopInfoVisibleProvider>
              </DialogOpenProvider>
            </IsNewMarkerSelectedProvider>
          </IsSavedMarkerSelectedProvider>
        </SetAddressesProvider>
      </SelectedAddressProvider>
    </IsAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
