import React from "react";
import StarSmileFillIcon from "remixicon-react/StarSmileFillIcon";
import Rating from "react-rating";
import Slider, { Range } from "rc-slider";
import MessageInput from "../form/msg-input";
import { useTranslation } from "react-i18next";

const StoreRate = () => {
  const { t: tl } = useTranslation();
  return (
    <>
      <div className="store-rate">
        <div className="content">
          <div className="left">
            <MessageInput />
            <div className="add-rate">
              <div className="comment">
                <input placeholder="Full name" />
              </div>
              <div className="add-rating">
                <Rating
                  className="rating-star"
                  initialRating={0}
                  emptySymbol={<StarSmileFillIcon />}
                  fullSymbol={<StarSmileFillIcon color="#FFB800" />}
                  onClick={(value) => console.log(value)}
                />
              </div>
            </div>
          </div>
          <div className="right">
            <div className="rate-slider">
              <div className="label">5</div>
              <Slider onChange={(value) => console.log(value)} />
            </div>
            <div className="rate-slider">
              <div className="label">4</div>
              <Slider onChange={(value) => console.log(value)} />
            </div>
            <div className="rate-slider">
              <div className="label">3</div>
              <Slider onChange={(value) => console.log(value)} />
            </div>
            <div className="rate-slider">
              <div className="label">2</div>
              <Slider onChange={(value) => console.log(value)} />
            </div>
            <div className="rate-slider">
              <div className="label">1</div>
              <Slider onChange={(value) => console.log(value)} />
            </div>
            <div className="final-rate">
              <Rating
                className="rating-star"
                initialRating={0}
                emptySymbol={<StarSmileFillIcon />}
                fullSymbol={<StarSmileFillIcon color="#FFB800" />}
                onClick={(value) => console.log(value)}
              />
              <span>4.0 out of 5.0</span>
            </div>
          </div>
        </div>
      </div>
      <div className="btn-group">
        <button className="btn-dark">{tl("Send")}</button>
        <button className="btn-default">{tl("Clear")}</button>
      </div>
    </>
  );
};

export default StoreRate;
