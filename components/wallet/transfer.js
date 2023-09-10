import React from "react";
import { useTranslation } from "react-i18next";
import InputText from "../form/input-text";

const TransferWallet = () => {
  const { t: tl } = useTranslation();
  return (
    <div className="add-wallet-wrapper">
      <div className="add-wallet">
        <div className="wallet-amount">
          <span>{tl("Amount")}</span>
          <strong>$0</strong>
        </div>
        <div className="add-wallet-form">
          <InputText
            className="card-number"
            label="User ID"
            placeholder="ID12345"
          />
        </div>
      </div>
      <button className="btn-success">{tl("Transfer money")}</button>
    </div>
  );
};

export default TransferWallet;
