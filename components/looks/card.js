import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import ThumbUpLineIcon from "remixicon-react/ThumbUpLineIcon";
import { BannerApi } from "../../api/main/banner";
import { imgBaseUrl } from "../../constants";
import { MainContext } from "../../utils/contexts/MainContext";
const LookCard = ({ product }) => {
  const { setContent, setOpen, setLookId, setDrawerTitle } =
    useContext(MainContext);
  const [count, setCount] = useState(0);
  const [lookId, setId] = useState(null);
  const { t: tl } = useTranslation();
  const handleClick = (product) => {
    setContent("show-look");
    setOpen(true);
    setLookId(product.id);
    setDrawerTitle(product?.translation?.title);
  };
  const handleLiked = (e, id) => {
    e.stopPropagation();
    setId(id);
    if (lookId === id) {
      setCount((prev) => prev - 1);
    } else {
      setCount((prev) => prev + 1);
    }

    BannerApi.liked(id)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };
  useEffect(() => {
    if (product) {
      setCount(product?.likes);
    }
  }, []);

  return (
    <div className="look-card" onClick={() => handleClick(product)}>
      <img src={imgBaseUrl + product.img} alt="look" />
      <div className="btn-group">
        <div className="like-btn product-count">
          <div className="label">{`${product.products?.length} ${tl(
            "products"
          )}`}</div>
        </div>
        <div className="like-btn" onClick={(e) => handleLiked(e, product.id)}>
          <ThumbUpLineIcon />
          <div className="label">{count}</div>
        </div>
      </div>
    </div>
  );
};

export default LookCard;
