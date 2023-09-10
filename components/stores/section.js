import React from "react";
import { useTranslation } from "react-i18next";
import Compas3FillIcon from "remixicon-react/Compass3FillIcon";
const StoresSection = ({ children, title = "title", icon = false }) => {
  const { t: tl } = useTranslation();
  return (
    <div className="stores-section">
      <div className="title">
        {icon && <Compas3FillIcon size={35} />}
        {tl(title)}
      </div>
      <div className="section-content">{children}</div>
    </div>
  );
};

export default StoresSection;
