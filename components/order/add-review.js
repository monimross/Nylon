import React, { useState } from "react";
import StarSmileFillIcon from "remixicon-react/StarSmileFillIcon";
import Rating from "react-rating";
import MessageInput from "../form/msg-input";
import { toast } from "react-toastify";
import InputText from "../form/input-text";
import { OrderApi } from "../../api/main/order";
import { useTranslation } from "react-i18next";
const OrderReview = ({ setOpen, data }) => {
  const { t: tl } = useTranslation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    OrderApi.createReview({
      id: data.id,
      rating,
      comment,
      name,
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
    setName("");
    setOpen(false);
  };
  return (
    <>
      <div className="product-rate">
        <div className="content">
          <div className="left">
            <MessageInput
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="review-form">
              <InputText
                onChange={(e) => setName(e.target.value)}
                name="name"
                label="Name"
                placeholder="John Doe"
                value={name}
              />
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
    </>
  );
};

export default OrderReview;
