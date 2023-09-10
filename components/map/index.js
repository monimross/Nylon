import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import { getLocationObj } from "../../utils/getLocation";
import { parseCookies } from "nookies";
import { imgBaseUrl } from "../../constants";

const cookies = parseCookies();
let config = null;
if (cookies?.settings) {
  config = JSON.parse(cookies?.settings);
}

const GoogleMap = (props) => {
  const defaultLocation = cookies.userLocation
    ? cookies.userLocation.split(",")
    : process.env.DEFAULT_LOCATION.split(",");
  const [selectedPlace, setSelectedPlace] = useState();
  const [activeMarker, setActiveMarker] = useState();
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);

  const locations = useMemo(() => {
    const storeLocations = [];
    if (props.stores) {
      props.stores.forEach((store) => {
        storeLocations.push({
          logo: store?.logo_img,
          uuid: store?.uuid,
          name: store?.translation?.title,
          lat: store?.location?.latitude,
          lng: store?.location?.longitude,
          open_time: store?.open_time,
          close_time: store?.close_time,
        });
      });
    }
    return storeLocations;
  }, [props.stores]);

  const center = locations.length > 0 ? locations[0] : props.address?.location;

  const onMarkerClick = (props, marker) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  const onInfoWindowClose = () => {
    setActiveMarker(null);
    setShowingInfoWindow(false);
  };

  const onClick = (t, map, coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    getLocationObj({
      location: { lat, lng },
      setAddress: props.setAddress,
      setValue: props.setValue,
    });
  };

  useEffect(() => {
    if (!props.address && !props.stores) {
      getLocationObj({
        location: { lat: defaultLocation[0], lng: defaultLocation[1] },
        setAddress: props.setAddress,
        setValue: props.setValue,
      });
    }
  }, []);

  return (
    <div className="map-wrapper">
      <Map
        onClick={onClick}
        google={props.google}
        zoom={10}
        initialCenter={center}
        center={center}
        className="container map"
      >
        {locations.length > 0 ? (
          locations.map((loc, key) => (
            <Marker
              key={key}
              name={loc.name}
              uuid={loc.uuid}
              logo={loc.logo}
              open_time={loc.open_time}
              close_time={loc.close_time}
              position={{
                lat: loc.lat,
                lng: loc.lng,
              }}
              title={loc.name}
              onClick={onMarkerClick}
              icon={{
                url: "https://cdn-icons-png.flaticon.com/32/64/64113.png",
              }}
            />
          ))
        ) : (
          <Marker
            position={center}
            icon={{
              url: "https://cdn-icons-png.flaticon.com/32/64/64113.png",
            }}
          />
        )}
        <InfoWindow
          marker={activeMarker}
          onClose={onInfoWindowClose}
          visible={showingInfoWindow}
        >
          <div className="custom-map-pin">
            <div className="shop">
              <div className="logo">
                <img src={imgBaseUrl + activeMarker?.logo} />
              </div>
              <div className="data">
                <Link href={`/stores/${selectedPlace?.uuid}`}>
                  <a className="info-window-link">{selectedPlace?.name}</a>
                </Link>
                <div className="time">{`${selectedPlace?.open_time} - ${selectedPlace?.close_time}`}</div>
              </div>
            </div>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: config?.google_map_key ? config.google_map_key : process.env.MAP_KEY,
  libraries: ["places"],
})(GoogleMap);
