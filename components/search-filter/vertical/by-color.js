import React from "react";
import { t } from "i18next";
import Scrollbars from "react-custom-scrollbars";
import { GetColorName } from "hex-color-to-color-name";

const ByColor = ({ data, handleExtras, isActive }) => {
  return (
    <>
      <div className="filter-title">{t("colors")}</div>
      <Scrollbars autoHeight autoHide autoHeightMin={50}>
        <div className="by-color">
          <ul>
            {data.map((item) => {
              if (item.value.includes("#")) {
                return (
                  <li onClick={() => handleExtras(item.id)}>
                    <div
                      key={item.id}
                      className={!isActive(item.id) ? "item" : "item active"}
                      style={{ background: item.value }}
                    />
                    <span>{GetColorName(item.value)}</span>
                  </li>
                );
              } else {
                return (
                  <li onClick={() => handleExtras(item.id)}>
                    <div
                      key={item.id}
                      className={
                        !isActive(item.id) ? "item text" : "item text active"
                      }
                      style={{ background: item.value }}
                    />
                    <span>{item.value}</span>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </Scrollbars>
    </>
  );
};

export default ByColor;
