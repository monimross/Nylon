import React from "react";
import { images } from "../../constants/images";
import useWindowSize from "../../utils/hooks/useWindowSize";

const LookBanner = () => {
  const windowSize = useWindowSize();
  return (
    <div className="look-banner">
      {windowSize.width > 412 ? (
        <img src={images.Look} alt="look banner" />
      ) : (
        <>
          <img src={images.LookMobile} alt="look banner" />
          <div className="banner-content">
            <div className="title">BEST LOOK</div>
            <div className="description">
              If you have comments, questions, or issues, our Guides
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LookBanner;
