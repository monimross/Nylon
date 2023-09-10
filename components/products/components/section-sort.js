import { t } from "i18next";
import React, { useContext } from "react";
import Filter3LineIcon from "remixicon-react/Filter3LineIcon";
import PauseFillIcon from "remixicon-react/PauseFillIcon";
import { MainContext } from "../../../utils/contexts/MainContext";

const SectionSort = ({ setOpen, sort, total }) => {
  const { layout, setLayout, setDrawerTitle } = useContext(MainContext);
  const click = () => {
    setOpen(true);
    setDrawerTitle("Filter");
  };

  return (
    <React.Fragment>
      {sort && (
        <div className="sort-header">
          <div className="total-count">{`${total} ${t("products")}`}</div>
          <div className="sort-box">
            <div className="filter-mobile" onClick={click}>
              <Filter3LineIcon size={16} />
              <span>{t("Filter")}</span>
            </div>
            <div className="layout-type">
              <span
                onClick={() => setLayout("vertical")}
                className={layout === "vertical" && "active"}
              >
                <PauseFillIcon />
              </span>
              <span
                onClick={() => setLayout("horizontal")}
                className={
                  layout === "horizontal" ? "horizontal active" : "horizontal"
                }
              >
                <PauseFillIcon />
              </span>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default SectionSort;
