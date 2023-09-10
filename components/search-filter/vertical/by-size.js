import React from "react";
import CheckboxBlankLineIcon from "remixicon-react/CheckboxBlankLineIcon";
import CheckboxFillIcon from "remixicon-react/CheckboxFillIcon";
import CategoryLoader from "../../loader/category";
import Scrollbars from "react-custom-scrollbars";
import { useState } from "react";
import { t } from "i18next";

const BySize = ({ sizes, handleExtras, isActive }) => {
  const [value, setValue] = useState("");
  return (
    <>
      <div className="filter-title">{t("size")}</div>
      {sizes?.length > 5 && (
        <div className="search-filter-item">
          <input
            onChange={(e) => setValue(e.target.value)}
            placeholder={t("search.size")}
          />
        </div>
      )}
      <Scrollbars autoHeight autoHide autoHeightMin={50}>
        <div className="by-brand">
          {sizes
            ?.filter((item) =>
              item.value.toLowerCase().includes(value.toLowerCase())
            )
            .map((item) => (
              <div
                key={item.id}
                className="item"
                onClick={() => handleExtras(item.id)}
              >
                <div className="name">
                  {isActive(item.id) ? (
                    <CheckboxFillIcon size={20} />
                  ) : (
                    <CheckboxBlankLineIcon size={20} />
                  )}
                  <span>{item.value}</span>
                </div>
              </div>
            ))}
        </div>
      </Scrollbars>
    </>
  );
};

export default BySize;
