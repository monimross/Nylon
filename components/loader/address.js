import React from "react";
import ContentLoader from "react-content-loader";

const AddressLoader = (props) => (
  <ContentLoader
    speed={2}
    width={242}
    height={281}
    viewBox="0 0 242 281"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className="address-loader"
    {...props}
  >
    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
    <rect x="1" y="49" rx="3" ry="3" width="410" height="6" />
    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
    <rect x="0" y="88" rx="7" ry="7" width="250" height="150" />
    <circle cx="20" cy="20" r="20" />
  </ContentLoader>
);

export default AddressLoader;
