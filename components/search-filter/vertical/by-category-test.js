import { useRouter } from "next/router";
import QueryString from "qs";
import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { shallowEqual, useSelector } from "react-redux";
import CheckboxBlankLineIcon from "remixicon-react/CheckboxBlankLineIcon";
import CheckboxFillIcon from "remixicon-react/CheckboxFillIcon";
import CategoryLoader from "../../loader/category";
import CallBackSearch from "../callBackSearch";
import { t } from "i18next";

const ByCategory = ({ handleFilter }) => {
  const router = useRouter();
  const query = QueryString.parse(router.query);
  const [filterText, setFilter] = useState("");
  const { loading, filters, error } = useSelector(
    (state) => state.filter,
    shallowEqual
  );

  const handleCLick = (id) => {
    const index = query.categoryIds?.findIndex((item) => parseInt(item) === id);
    if (index >= 0) {
      const newIds = QueryString.parse(router.query).categoryIds.filter(
        (item) => parseInt(item) !== id
      );
      query.categoryIds = newIds;
      handleFilter({ ...query });
    } else {
      const newArray = query.categoryIds || [];
      handleFilter({ ...query, categoryIds: [...newArray, id] });
    }
  };

  const isActive = (id) => {
    const includes = query.categoryIds?.includes(id.toString());

    return includes;
  };
  return (
    <>
      <div className="filter-title">{t("categories")}</div>
      {Boolean(loading) ? (
        <CategoryLoader />
      ) : (
        <div className="by-category">
          {filters.categories?.length > 5 && (
            <CallBackSearch setFilter={setFilter} />
          )}
          <Scrollbars autoHeight autoHide autoHeightMin={50}>
            {filters.categories?.length === 0 && (
              <div style={{ textAlign: "center", fontSize: 12 }}>
                {t("Item not fount")}
              </div>
            )}
            <div className="by-brand">
              {filters.categories
                ?.filter((item) =>
                  Boolean(filterText)
                    ? item.translation.title
                        .toLowerCase()
                        .includes(filterText.toLowerCase())
                    : item
                )
                ?.map((item) => (
                  <div
                    key={item.id}
                    className="item"
                    onClick={() => handleCLick(item.id)}
                  >
                    <div className="name">
                      {isActive(item.id) ? (
                        <CheckboxFillIcon size={20} />
                      ) : (
                        <CheckboxBlankLineIcon size={20} />
                      )}
                      <span>{item?.translation?.title}</span>
                    </div>
                  </div>
                ))}
            </div>
          </Scrollbars>
        </div>
      )}
    </>
  );
};

export default ByCategory;
