import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const Empty = ({ image, text1 = "", text2 = "", btn = false, setOpen }) => {
  const { t: tl } = useTranslation();
  return (
    <div className="empty">
      <div className="empty-img">
        <img src={image} alt="Logo" />
      </div>
      <div className="empty-message">
        <span className="text-1">{tl(text1)}</span>
        <span className="text-2">{tl(text2)}</span>
      </div>
      {btn && (
        <Link href="/">
          <button onClick={() => setOpen(false)} className="btn-dark">
            {tl("Go to store")}
          </button>
        </Link>
      )}
    </div>
  );
};

export default Empty;
