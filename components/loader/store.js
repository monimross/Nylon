import React from "react";
import ContentLoader from "react-content-loader";

const StoreLoader = (props) => (
  <ContentLoader
    speed={1}
    width={324}
    height={254}
    viewBox="0 0 324 254"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="237" y="25" rx="3" ry="3" width="52" height="6" />
    <rect x="0" y="122" rx="3" ry="3" width="157" height="22" />
    <rect x="0" y="156" rx="3" ry="3" width="324" height="18" />
    <rect x="0" y="198" rx="3" ry="3" width="324" height="1" />
    <circle cx="35" cy="35" r="35" />
    <rect x="10" y="213" rx="0" ry="0" width="111" height="26" />
    <rect x="149" y="213" rx="0" ry="0" width="111" height="26" />
  </ContentLoader>
);

export default StoreLoader;
