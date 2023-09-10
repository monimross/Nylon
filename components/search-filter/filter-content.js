import React, { useContext, useState } from "react";
import PauseFillIcon from "remixicon-react/PauseFillIcon";
import Slider from "rc-slider";
import { useSelector } from "react-redux";
import { MainContext } from "../../utils/contexts/MainContext";
import { parseCookies } from "nookies";
import { useTranslation } from "react-i18next";
const FilterContent = () => {
  const { t: tl } = useTranslation();
  const cookies = parseCookies();
  const currency_symbol = cookies.currency_symbol;
  const category = useSelector((state) => state.category.categoryList);
  const { setLayout, layout, category_id, setCategoryId, sort, setSort } =
    useContext(MainContext);
  const [range, setRange] = useState(null);
  const [showRange, setShowRange] = useState([0, 1000000]);
  const handleChange = (value) => {
    setRange(value);
    setShowRange(value);
  };
  return (
    <div className="filter-content">
      <div className="title">{tl("category")}</div>
      <div className="categories">
        {category?.data
          ?.filter((item) => item.translation !== null)
          ?.map((item, key) => {
            return (
              <div
                key={key}
                className={item.id === category_id ? "item active" : "item"}
                onClick={() => setCategoryId(item.id)}
              >
                {item.translation?.title}
              </div>
            );
          })}
      </div>
      <div className="price">
        <div className="label">Price</div>
        <div className="low-high">
          <span
            className={sort === "asc" ? "active" : ""}
            onClick={() => setSort("asc")}
          >
            {tl("By low price")}
          </span>
          <span
            className={sort === "desc" ? "active" : ""}
            onClick={() => setSort("desc")}
          >
            {tl("By high price")}
          </span>
        </div>
      </div>
      <div className="filter-slider">
        <div className="price-rage">
          <span>{`${currency_symbol} ${showRange ? showRange[0] : 0}`}</span>
          <span>{`${currency_symbol} ${showRange ? showRange[1] : 0}`}</span>
        </div>
        <Slider
          range
          allowCross={false}
          defaultValue={[1, showRange[1]]}
          min={1}
          max={1000000}
          onChange={(value) => handleChange(value)}
        />
      </div>
      <div className="filter-layout">
        <div className="title">{tl("layouts")}</div>
        <div className="layout-item">
          <span
            onClick={() => setLayout("vertical")}
            className={layout === "vertical" && "active"}
          >
            <PauseFillIcon />
          </span>
          <span
            onClick={() => setLayout("horizontal")}
            className={
              layout === "horizontal" ? "horizontal active" : "horizontal"
            }
          >
            <PauseFillIcon />
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterContent;
