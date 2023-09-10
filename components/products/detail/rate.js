import React, { useState } from "react";
import StarSmileFillIcon from "remixicon-react/StarSmileFillIcon";
import UploadCloud2LineIcon from "remixicon-react/UploadCloud2LineIcon";
import DeleteBin5LineIcon from "remixicon-react/DeleteBin5LineIcon";
import Rating from "react-rating";
import MessageInput from "../../form/msg-input";
import { UploadApi } from "../../../api/main/upload";
import { toast } from "react-toastify";
import { CommentApi } from "../../../api/main/comment";
import { useTranslation } from "react-i18next";
const ProductRate = ({ uuid, setOpen, getProduct }) => {
  const { t: tl } = useTranslation();
  const [file, setFile] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [uploadImages, setUploadImages] = useState([]);

  const fileSelectedHandler = (event) => {
    if (
      event.target.files[0].type === "image/jpeg" ||
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/svg"
    ) {
      setFile([...file, event.target.files[0]]);
      const images = new FormData();
      images.append("image", event.target.files[0]);
      images.append("type", "reviews");
      UploadApi.create(images)
        .then((res) => {
          setUploadImages([...uploadImages, res.data.title]);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error");
        });
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setGallery([...gallery, reader.result]);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error(tl("You need to select jpeg, png or svg file"));
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (rating || comment) {
      CommentApi.create(
        {
          rating,
          comment,
          images: uploadImages,
        },
        uuid
      )
        .then(() => {
          toast.success("Success");
          handleClear();
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        })
        .finally(() => {
          getProduct(uuid);
        });
    } else {
      toast.error(tl("Please write a review first"));
    }
  };
  const handleDelete = (key) => {
    gallery.splice(key, 1);
    uploadImages.splice(key, 1);
    file.splice(key, 1);
    setGallery([...gallery]);
    setUploadImages([...uploadImages]);
    setFile([...file]);
  };
  const handleClear = () => {
    setOpen(false);
    setComment("");
    setRating(0);
    setGallery([]);
    setFile([]);
    setUploadImages([]);
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
          <div className="upload-wrapper">
            <label>
              <input
                type="file"
                style={{ display: "none" }}
                onChange={fileSelectedHandler}
                required
                multiple={true}
                disabled={file?.length > 3 ? true : false}
              />
              <div className="upload-image">
                <UploadCloud2LineIcon size={30} />
                <span>{tl("Upload product photo")}</span>
                <small>{tl("Max 4 photo")}</small>
              </div>
            </label>
            <div className="images">
              {gallery?.map((src, key) => {
                return (
                  <div key={key} className="img-wrapper">
                    <img src={src} alt="product" />
                    <div
                      className="remove-img"
                      onClick={() => handleDelete(key)}
                    >
                      <DeleteBin5LineIcon size={32} color="#fff" />
                    </div>
                  </div>
                );
              })}
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

export default ProductRate;
