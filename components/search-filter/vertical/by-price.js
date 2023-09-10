import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import { parseCookies } from "nookies";
import useDebounce from "../../../utils/hooks/useDebounce";
import { useTranslation } from "react-i18next";
import QueryString from "qs";
import { useRouter } from "next/router";
const ByPrice = ({ handleFilter }) => {
  const router = useRouter();
  const query = QueryString.parse(router.query);
  const { t: tl } = useTranslation();
  const cookies = parseCookies();
  const currency_rate = cookies?.currency_rate;
  const currency_symbol = cookies?.currency_symbol;
  const [range, setRange] = useState(null);
  const [sort, setSort] = useState(null);
  const [showRange, setShowRange] = useState([0, 10000 * currency_rate]);
  const debouncedRange = useDebounce(range, 1000);
  const handleChange = (value) => {
    setRange(value);
    setShowRange(value);
  };
  useEffect(() => {
    if (debouncedRange) {
      handleFilter({ ...query, range: range });
    }
  }, [debouncedRange]);

  const handleByPrice = (value) => {
    setSort(value);
    handleFilter({ ...query, sort: value });
  };
  return (
    <div className="by-price">
      <div className="filter-title">{tl("Price")}</div>
      <div className="price-type">
        <div
          className={sort === "asc" ? "item selected" : "item"}
          onClick={() => handleByPrice("asc")}
        >
          {tl("By low price")}
        </div>
        <div
          className={sort === "desc" ? "item selected" : "item"}
          onClick={() => handleByPrice("desc")}
        >
          {tl("By high price")}
        </div>
      </div>
      <div className="price-rage">
        <span>{`${currency_symbol} ${showRange[0]}`}</span>
        <span>{`${currency_symbol} ${showRange[1]}`}</span>
      </div>
      <Slider
        className="slider"
        range
        allowCross={false}
        defaultValue={[0, 10000]}
        min={1}
        max={10000 * currency_rate}
        onChange={(value) => handleChange(value)}
      />
    </div>
  );
};

export default ByPrice;
