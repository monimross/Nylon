import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Thumbs } from "swiper";
import useWindowSize from "../../../utils/hooks/useWindowSize";
import { imgBaseUrl } from "../../../constants";
const ImgMagnify = ({ galleries = [], targetImg = {}, direction }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [gallery, setGallery] = useState(galleries);
  const windowSize = useWindowSize();
  const index = galleries.findIndex((item) => item.path === targetImg?.value);

  useEffect(() => {
    if (index < 0 && targetImg?.value) {
      galleries.splice(1, 1, { path: targetImg.value });
    }
    setGallery(galleries);
  }, [targetImg?.value, galleries]);

  if (!targetImg) {
    return "";
  }
  return (
    <div className="img-magnify">
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={16}
        slidesPerView={10}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="swiper-sm"
        direction={
          direction
            ? direction
            : windowSize?.width >= 960
            ? "vertical"
            : "horizontal"
        }
      >
        {gallery?.map((img) => (
          <SwiperSlide key={img.path}>
            <img src={imgBaseUrl + img.path} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className="swiper-lg"
        breakpoints={{
          360: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          1200: {
            slidesPerView: 2,
          },
        }}
      >
        {gallery?.map((img) => (
          <SwiperSlide key={img.path}>
            <img src={imgBaseUrl + img.path} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div id="myPortal" />
    </div>
  );
};

export default ImgMagnify;
