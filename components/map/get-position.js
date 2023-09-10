import React from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { useTranslation } from "react-i18next";
import Search2LineIcon from "remixicon-react/Search2LineIcon";
import { parseCookies } from "nookies";

const GetPosition = ({ setAddress, value, setValue }) => {
  const cookie = parseCookies();
  let config = null;

  if (cookie?.settings) {
    config = JSON.parse(cookie?.settings);
  }

  const { t: tl } = useTranslation();
  const { ref } = usePlacesWidget({
    apiKey: config?.google_map_key
      ? config.google_map_key
      : process.env.MAP_KEY,
    onPlaceSelected: (place) => {
      if (place) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setAddress({
          address: place.formatted_address,
          location: { lat, lng },
        });
        setValue(place.formatted_address);
      }
    },
    options: {
      // bounds: defaultBounds,
      // componentRestrictions: { country: "us" },
      fields: [
        "address_components",
        "geometry",
        "icon",
        "name",
        "formatted_address",
      ],
      strictBounds: false,
      types: ["establishment"],
    },
  });

  return (
    <div className="address-input">
      <Search2LineIcon size={20} />
      <div className="input">
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          ref={ref}
          placeholder={tl("Search")}
        />
      </div>
    </div>
  );
};

export default GetPosition;
