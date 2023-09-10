import React from "react";
import Message3Lineicon from "remixicon-react/Message3LineIcon";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
const RippleButton = ({ onClick }) => {
  const cookie = parseCookies();

  const handleCLick = () => {
    if (cookie?.access_token) {
      onClick(true);
    } else {
      toast.error("Please login first");
    }
  };
  return (
    <div className="ripple-btn" onClick={handleCLick}>
      <button>
        <Message3Lineicon size={24} />
      </button>
    </div>
  );
};

export default RippleButton;
