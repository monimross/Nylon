import React from "react";
import CategoryLoader from "../loader/category";

const WalletHistory = ({ walletList }) => {
  return (
    <div className="wallet-history">
      {walletList ? (
        walletList.map((item) => (
          <div className="history-item">
            <div className="item-data">{`#${item.id}`}</div>
            <div className="item-data">{item.note}</div>
            <div className="item-data income">{`+ $${item.price}`}</div>
            <div className="item-data">{item.created_at.slice(0, 16)}</div>
          </div>
        ))
      ) : (
        <>
          <CategoryLoader />
          <CategoryLoader />
          <CategoryLoader />
          <CategoryLoader />
          <CategoryLoader />
        </>
      )}
    </div>
  );
};

export default WalletHistory;
