import React from "react";
import ContentLoader from "react-content-loader";

const ProductLoader = (props) => (
  <ContentLoader
    width={320}
    height={400}
    viewBox="0 0 320 400"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
    {...props}
  >
    <rect x="0" y="323" rx="4" ry="4" width="271" height="9" />
    <rect x="0" y="343" rx="3" ry="3" width="119" height="6" />
    <rect x="0" y="0" rx="10" ry="10" width="320" height="310" />
  </ContentLoader>
);

export default ProductLoader;
