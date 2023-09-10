import React from "react";
import { useTranslation } from "react-i18next";

const SearchFilterItem = ({ list = [], setFilteredList, placeholder }) => {
  const { t: tl } = useTranslation();
  const handleFilter = (value) => {
    const newArray = list.filter((item) =>
      item.title
        ? item.title.toLowerCase().includes(value.toLowerCase())
        : item.translation.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredList(newArray);
  };
  return (
    <div className="search-filter-item">
      <input
        placeholder={tl(placeholder)}
        onChange={(e) => handleFilter(e.target.value)}
      />
    </div>
  );
};

export default SearchFilterItem;
