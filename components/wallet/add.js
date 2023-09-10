import React from "react";
import { useTranslation } from "react-i18next";
import InputText from "../form/input-text";

const AddWallet = () => {
  const { t: tl } = useTranslation();
  return (
    <div className="add-wallet-wrapper">
      <div className="add-wallet">
        <div className="wallet-amount">
          <span>{tl("Amount")}</span>
          <strong>$0</strong>
        </div>
        <div className="add-wallet-form">
          <div className="row">
            <InputText
              className="card-number"
              label="Card Number"
              placeholder="0000 0000 0000 0000"
            />
            <InputText
              className="card-name"
              label="Card Name"
              placeholder="Cardholder name"
            />
          </div>
          <div className="row">
            <InputText
              className="expire"
              label="Expiry date"
              placeholder="00/00"
            />
            <InputText className="cvc" label="CVC" placeholder="000" />
          </div>
        </div>
      </div>
      <button className="btn-success">{tl("Top up wallet")}</button>
    </div>
  );
};

export default AddWallet;
