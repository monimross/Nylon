import React, { useState } from "react";
import Accordion from "../../accordion";
import AccordionDetails from "../../accordion/accordion-details";
import AccordionSummary from "../../accordion/accordion-summary";
import ByCategory from "./by-category-test";
import ByBrand from "./by-brand";
import ByPrice from "./by-price";
import { useTranslation } from "react-i18next";
import ByShops from "./by-shop";
import ByExtras from "./by-extras";

const VerticalFilter = ({ className, handleFilter }) => {
  const { t: tl } = useTranslation();
  const [idList, setIdList] = useState(["category", "size", "color", "brand"]);

  const handleClick = (key) => {
    const includes = idList.includes(key);
    if (includes) {
      setIdList(idList.filter((item) => item !== key));
    } else {
      setIdList([...idList, key]);
    }
  };

  return (
    <div className={`filter-vertical ${className}`}>
      <ByCategory handleFilter={handleFilter} />
      <ByBrand handleFilter={handleFilter} />
      <ByShops handleFilter={handleFilter} />
      <ByExtras
        idList={idList}
        setIdList={setIdList}
        handleClick={handleClick}
        handleFilter={handleFilter}
      />
      <ByPrice handleFilter={handleFilter} />
    </div>
  );
};

export default VerticalFilter;
