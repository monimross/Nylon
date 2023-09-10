import React from "react";
import { images } from "../../constants/images";
import InputText from "../form/input-text";
import { useTranslation } from "react-i18next";

const AddNewCard = () => {
  const { t: tl } = useTranslation();
  return (
    <div className="add-card">
      <div className="card-form">
        <InputText
          label="Card number"
          placeholder="0000 0000 0000 0000"
          className="card-number"
        />
        <InputText
          label="Full name"
          placeholder="Type here"
          className="full-name"
        />
        <div className="row">
          <InputText
            label="Expired date"
            placeholder="00/00"
            className="expire"
          />
          <InputText label="CVC" placeholder="000" className="cvc" />
        </div>
        <button className="btn-success">{tl("Save")}</button>
      </div>
      <div className="default-card">
        <div className="card-number">0000 0000 0000 0000 </div>
        <img className="card-chip" src={images.Chip} alt="Chip" />
      </div>
    </div>
  );
};

export default AddNewCard;
