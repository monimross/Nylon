import React, { useContext, useState } from "react";
import StarSmileFillIcon from "remixicon-react/StarSmileFillIcon";
import Rating from "react-rating";
import MessageInput from "../form/msg-input";
import { toast } from "react-toastify";
import { OrderApi } from "../../api/main/order";
import { useTranslation } from "react-i18next";
import CustomDrawer from "../drawer";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { handleDeliverymanRate } from "../../redux/slices/order";
import { MainContext } from "../../utils/contexts/MainContext";
const DeliverymanReview = ({ data }) => {
  const dispatch = useDispatch();
  const { t: tl } = useTranslation();
  const { setDrawerTitle } = useContext(MainContext);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { isDeliverymanRate } = useSelector(
    (state) => state.order,
    shallowEqual
  );
  const onSubmit = (e) => {
    e.preventDefault();
    OrderApi.createDeliverymanReview({
      id: data.id,
      rating,
      comment,
    })
      .then(() => {
        toast.success("Success");
        handleClear();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };
  const handleClear = () => {
    setComment("");
    setRating(0);
    setOpen(false);
  };
  function setOpen(value) {
    dispatch(handleDeliverymanRate(value));
    setDrawerTitle("Deliveryman review");
    return isDeliverymanRate;
  }
  return (
    <CustomDrawer open={isDeliverymanRate} setOpen={setOpen}>
      <div className="product-rate">
        <div className="content">
          <div className="left">
            <MessageInput
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="review-form">
              <div className="add-rate">
                <div className="add-rating">
                  <Rating
                    className="rating-star"
                    initialRating={rating}
                    emptySymbol={<StarSmileFillIcon />}
                    fullSymbol={<StarSmileFillIcon color="#FFB800" />}
                    onClick={(value) => setRating(value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="btn-group">
        <button className="btn-dark" onClick={onSubmit}>
          {tl("Send")}
        </button>
        <button className="btn-default" onClick={handleClear}>
          {tl("Clear")}
        </button>
      </div>
    </CustomDrawer>
  );
};

export default DeliverymanReview;
