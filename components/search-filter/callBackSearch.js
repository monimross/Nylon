import React from "react";
import { useTranslation } from "react-i18next";

const CallBackSearch = ({ setFilter }) => {
  const { t: tl } = useTranslation();

  return (
    <div className="search-filter-item">
      <input
        placeholder={tl("category")}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

export default CallBackSearch;
