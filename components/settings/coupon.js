import React from "react";
import { images } from "../../constants/images";
const array = [1, 2, 3, 4, 5, 6];
const Coupon = () => {
  return (
    <div className="coupon-box">
      {array.map((key) => {
        return (
          <div key={key} className="coupon">
            <img src={images.Coupon} />
            <div className="content">
              <div className="shop">
                <div className="logo">
                  <img src={images.Logo} />
                </div>
                <div className="name">dolce & gabana</div>
              </div>
              <div className="sale">
                <div className="amount">
                  <strong>20% </strong>
                  <span>off</span>
                </div>
                <label>For your first total order</label>
              </div>
              <div className="btn">Copy code</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Coupon;
