import React, { useEffect, useState } from "react";
import { UserApi } from "../../api/main/user";
import WalletHistory from "../../components/wallet/history";

const Wallet = ({ setLoader }) => {
  const [walletList, setWalletList] = useState(null);
  useEffect(() => {
    setLoader(true);
    UserApi.getWallet()
      .then((res) => {
        setWalletList(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);
  return <WalletHistory walletList={walletList} />;
};

export default Wallet;
