import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import CloseFillIcon from "remixicon-react/CloseFillIcon";
import { MainContext } from "../../utils/contexts/MainContext";
import fnBrowserDetect from "../../utils/fnBrowserDetect";
const CustomDrawer = ({
  open,
  setOpen,
  children,
  direction = "bottom",
  header = true,
  className = "drawer",
  title = true,
}) => {
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const { t: tl } = useTranslation();
  const { drawerTitle } = useContext(MainContext);
  const [size, setSize] = useState("max-content");

  useEffect(() => {
    const size = fnBrowserDetect() === "chrome" ? "max-content" : "100dvh";
    setSize(size);
  }, []);

  return (
    <Drawer
      open={open}
      onClose={toggleDrawer}
      direction={direction}
      className={className}
      size={size}
      duration={250}
      style={{ minWidth: 360 }}
    >
      {header && (
        <div className="header">
          {title && <div className="title">{tl(drawerTitle)}</div>}
          <div className="close" onClick={toggleDrawer}>
            <CloseFillIcon size={30} />
          </div>
        </div>
      )}
      <div className="container">{children}</div>
    </Drawer>
  );
};

export default CustomDrawer;
