import { parseCookies } from "nookies";
import React from "react";
import { useTranslation } from "react-i18next";
import { images } from "../../constants/images";

const AppBanner = () => {
  const { t: tl } = useTranslation();
  let config = null;
  if (parseCookies()?.settings) {
    config = JSON.parse(parseCookies()?.settings);
  }
  return (
    <div className="app-banner">
      <div className="app-banner-laptop">
        <img src={images.AppBanner} alt="app-banner" />
      </div>
      <div className="app-banner-mobile">
        <img src={images.MobileApp} alt="app-banner" />
      </div>
      <div className="banner-content">
        <div className="title">
          {tl("Download")} <br />
          {tl("goshops mobile app")}
        </div>
        <div className="description">{tl("app.banner.description")}</div>
        <div className="play-store">
          <a href={config?.app_store_url} target="_blank" rel="noreferrer">
            <img className="app-store" src={images.AppStore} alt="app store" />
          </a>
          <a href={config?.google_play_url} target="_blank" rel="noreferrer">
            <img
              className="google-play"
              src={images.GooglePlay}
              alt="google play"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AppBanner;
