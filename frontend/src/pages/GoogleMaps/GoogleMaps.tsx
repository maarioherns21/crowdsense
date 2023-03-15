import { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  useLoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import Autocomplete from "react-google-autocomplete";

import env from "ts-react-dotenv";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const options = {
  fields: ["address_components", "geometry"],
  types: ["address"],
};

const libraries: any = ["places", "maps"];

const Autos = () => {
  const GOOGLE_API: any = process.env.REACT_APP_GOOGLE_API_KEY;

  const { isLoaded } = useLoadScript({
    libraries,
    googleMapsApiKey: GOOGLE_API || "",
  });

  const [address, setAddress] = useState<any>(null);
  const [map, setMap] = useState(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  
/// this fetches the data from  the api adress
  const fetchD = async (place: any) => {
    try {
      setAddress(null); // Reset the address
      const res = await place;
      console.log(res);
      setAddress(res);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  ///cordinates
  const center = {
    lat: address?.geometry?.viewport?.Va?.hi,
    lng: address?.geometry?.viewport?.Ja?.hi,
  };
   
  //renders /loads the map
  const onLoad = async (map: any) => {
    const bounds = new window.google.maps.LatLngBounds(center);

    await map.fitBounds(bounds);
    console.log(map);
    setMap(map);
  };
  /// resets the map
  const onUnmount = async (map: any) => {
    setMap(null);
  };
  //shows info for the adress
  const showInfoWindow = () => {
    setInfoWindowOpen(true);
  };

  return isLoaded ? (
    <div>
      <Autocomplete
        style={{ width: "90%" }}
        onPlaceSelected={fetchD}
        options={options}
        defaultValue=""
      />

      {address && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker
            title="Marker Name"
            position={center}
            onClick={showInfoWindow}
          >
            {infoWindowOpen && (
              <InfoWindow onCloseClick={() => setInfoWindowOpen(false)}>
                <h1>Hi I am Info Window</h1>
              </InfoWindow>
            )}
          </Marker>
        </GoogleMap>
      )}
    </div>
  ) : (
    <></>
  );
};

export default Autos;