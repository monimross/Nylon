import React from "react";
import ContentLoader from "react-content-loader";

const ImageLoader = (props) => {
  return (
    <div style={{ marginBottom: "14px" }}>
      <ContentLoader
        speed={1}
        width={"100%"}
        height={230}
        viewBox="0 0 100% 230"
        backgroundColor="#ffffff"
        foregroundColor="#ededed"
        {...props}
      >
        <rect x="0" y="0" rx="15" ry="15" width="100%" height="230" />
      </ContentLoader>
    </div>
  );
};

export default ImageLoader;
