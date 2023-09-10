import dynamic from "next/dynamic";
import React, { useContext, useEffect } from "react";
import EnterAddress from "../components/address/enter-delivery-address";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import SerachFilter from "../components/search-filter";
import { MainContext } from "../utils/contexts/MainContext";
import { useRouter } from "next/router";

const CustomDrawer = dynamic(() => import("../components/drawer"));
const OrderList = dynamic(() => import("../components/order/list"));
const AddWallet = dynamic(() => import("../components/wallet/add"));
const WalletHistory = dynamic(() => import("../components/wallet/history"));
const TransferWallet = dynamic(() => import("../components/wallet/transfer"));
const LookDetail = dynamic(() => import("../components/looks/detail"));

const Layout = ({ children }) => {
  const { isOpen, setIsOpen, open, setOpen, content, setContent } =
    useContext(MainContext);
  const router = useRouter();
  const handleContent = (key) => {
    setContent(key);
    setOpen(true);
  };

  useEffect(() => {
    if (!content) setOpen(false);
  }, []);
  return (
    <>
      <div className="container">
        <Navbar handleContent={handleContent} />
        <SerachFilter
          className={router.pathname === "/products/[id]" ? "inner-store" : ""}
        />
        {children}
        <Footer />
        <CustomDrawer
          title="Top up wallet"
          open={open}
          setOpen={setOpen}
          className="drawer"
        >
          {content === "add-wallet" && <AddWallet />}
          {content === "transfer-wallet" && <TransferWallet />}
          {content === "wallet-history" && <WalletHistory />}
          {content === "order-list" && <OrderList setOpen={setOpen} />}
          {isOpen === "enter-address" && (
            <EnterAddress setIsOpen={setIsOpen} setOpen={setOpen} />
          )}
          {content === "show-look" && <LookDetail open={open} />}
        </CustomDrawer>
      </div>
      <div
        onClick={() => setIsOpen(null)}
        className={isOpen ? "backdrop" : "d-none"}
      />
    </>
  );
};

export default Layout;
