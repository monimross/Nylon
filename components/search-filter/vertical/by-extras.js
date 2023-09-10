import { useRouter } from "next/router";
import QueryString from "qs";
import React from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import Accordion from "../../accordion";
import AccordionDetails from "../../accordion/accordion-details";
import AccordionSummary from "../../accordion/accordion-summary";
import ByColor from "./by-color";
import BySize from "./by-size";

const ByExtras = ({ handleClick, idList, handleFilter }) => {
  const router = useRouter();
  const { t: tl } = useTranslation();
  const { extras } = useSelector((state) => state.extras, shallowEqual);
  const { filters } = useSelector((state) => state.filter, shallowEqual);
  const query = QueryString.parse(router.query);

  const handleExtras = (id) => {
    const index = query.extrasIds?.findIndex((item) => parseInt(item) === id);
    if (index >= 0) {
      const newIds = QueryString.parse(router.query).extrasIds.filter(
        (item) => parseInt(item) !== id
      );
      query.extrasIds = newIds;
      handleFilter({ ...query });
    } else {
      const newArray = query.extrasIds || [];
      handleFilter({ ...query, extrasIds: [...newArray, id] });
    }
  };

  const isActive = (id) => {
    const includes = query.extrasIds?.includes(id.toString());

    return includes;
  };

  return (
    <>
      {extras?.data?.map((item, key) => {
        if (filters.extraValues?.[item.id])
          return (
            <>
              {item.type === "text" ? (
                <BySize
                  isActive={isActive}
                  handleFilter={handleFilter}
                  sizes={filters.extraValues?.[item.id]}
                  handleExtras={handleExtras}
                />
              ) : (
                <ByColor
                  isActive={isActive}
                  handleFilter={handleFilter}
                  data={filters.extraValues?.[item.id]}
                  handleExtras={handleExtras}
                />
              )}
            </>
          );
      })}
    </>
  );
};

export default ByExtras;
