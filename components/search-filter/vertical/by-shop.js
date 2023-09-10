import React, { useState } from "react";
import CheckboxBlankLineIcon from "remixicon-react/CheckboxBlankLineIcon";
import CheckboxFillIcon from "remixicon-react/CheckboxFillIcon";
import { useRouter } from "next/router";
import CategoryLoader from "../../loader/category";
import { useTranslation } from "react-i18next";
import Scrollbars from "react-custom-scrollbars";
import SearchFilterItem from "../search-filter-item";
import { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import QueryString from "qs";
import { t } from "i18next";
const ByShops = ({ handleFilter }) => {
  const { t: tl } = useTranslation();
  const router = useRouter();
  const query = QueryString.parse(router.query);
  const { loading, filters, error } = useSelector(
    (state) => state.filter,
    shallowEqual
  );
  const [shops, setShops] = useState(filters.shops || []);

  const handleCLick = (id) => {
    const index = query.shopIds?.findIndex((item) => parseInt(item) === id);
    if (index >= 0) {
      const newIds = QueryString.parse(router.query).shopIds.filter(
        (item) => parseInt(item) !== id
      );
      query.shopIds = newIds;
      handleFilter({ ...query });
    } else {
      const newArray = query.shopIds || [];
      handleFilter({ ...query, shopIds: [...newArray, id] });
    }
  };

  const isActive = (id) => {
    const includes = query.shopIds?.includes(id.toString());

    return includes;
  };

  useEffect(() => {
    setShops(filters.shops);
  }, [filters.shops]);

  return (
    <>
      <div className="filter-title">{t("shops")}</div>
      {shops?.length > 5 && (
        <SearchFilterItem
          list={filters.shops}
          setFilteredList={setShops}
          placeholder="search.shop"
        />
      )}
      <Scrollbars autoHeight autoHide autoHeightMin={50}>
        {shops?.length === 0 && (
          <div style={{ textAlign: "center", fontSize: 12 }}>
            {tl("Item not fount")}
          </div>
        )}

        {Boolean(loading) ? (
          <CategoryLoader />
        ) : (
          <div className="by-brand">
            {shops?.map((item) => (
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
                  <span>{item.translation.title}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Scrollbars>
    </>
  );
};

export default ByShops;
