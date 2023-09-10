import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { imgBaseUrl } from "../../constants";
import { Pagination } from "swiper";
import "swiper/css/pagination";

const HomeBanner = ({ bannerList }) => {
  return (
    <Swiper pagination={true} modules={[Pagination]}>
      {bannerList ? (
        bannerList?.map((banner, key) => (
          <SwiperSlide key={key}>
            <div className="home-banner">
              <img src={imgBaseUrl + banner.img} />
            </div>
          </SwiperSlide>
        ))
      ) : (
        <div className="home-banner loading" />
      )}
    </Swiper>
  );
};

export default HomeBanner;
