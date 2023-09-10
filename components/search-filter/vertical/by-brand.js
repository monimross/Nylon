import React, { useState } from "react";
import CheckboxBlankLineIcon from "remixicon-react/CheckboxBlankLineIcon";
import CheckboxFillIcon from "remixicon-react/CheckboxFillIcon";
import CategoryLoader from "../../loader/category";
import { useTranslation } from "react-i18next";
import Scrollbars from "react-custom-scrollbars";
import SearchFilterItem from "../search-filter-item";
import { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import QueryString from "qs";
import { useRouter } from "next/router";
const ByBrand = ({ handleFilter }) => {
  const { t: tl } = useTranslation();
  const router = useRouter();
  const query = QueryString.parse(router.query);
  const { loading, filters, error } = useSelector(
    (state) => state.filter,
    shallowEqual
  );
  const [brand, setBrand] = useState(filters.brands || []);

  const handleCLick = (id) => {
    const index = query.brandIds?.findIndex((item) => parseInt(item) === id);
    if (index >= 0) {
      const newIds = QueryString.parse(router.query).brandIds.filter(
        (item) => parseInt(item) !== id
      );
      query.brandIds = newIds;
      handleFilter({ ...query });
    } else {
      const newArray = query.brandIds || [];
      handleFilter({ ...query, brandIds: [...newArray, id] });
    }
  };

  const isActive = (id) => {
    const includes = query.brandIds?.includes(id.toString());

    return includes;
  };

  useEffect(() => {
    setBrand(filters.brands);
  }, [filters.brands]);

  return (
    <>
      <div className="filter-title">{tl("brands")}</div>

      {filters.brands?.length > 5 && (
        <SearchFilterItem
          list={filters.brands}
          setFilteredList={setBrand}
          placeholder="search.brand"
        />
      )}

      <Scrollbars autoHeight autoHide autoHeightMin={50}>
        {brand?.length === 0 && (
          <div style={{ textAlign: "center", fontSize: 12 }}>
            {tl("Item not fount")}
          </div>
        )}
        {Boolean(loading) ? (
          <CategoryLoader />
        ) : (
          <div className="by-brand">
            {brand?.map((item) => (
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
                  <span>{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Scrollbars>
    </>
  );
};

export default ByBrand;
