import React, { useEffect } from "react";
import { useContext } from "react";
import { MainContext } from "../../utils/contexts/MainContext";
import OutsideAlerter from "../../utils/hooks/useClickOutside";
import useWindowSize from "../../utils/hooks/useWindowSize";
import LaptopCategory from "../search-filter/vertical/helper/laptop-category";
import MobileCategory from "../search-filter/vertical/helper/mobile-category";
import Apps2FillIcon from "remixicon-react/Apps2FillIcon";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { getCategory } from "../../redux/slices/category";
const Category = () => {
  const { t: tl } = useTranslation();
  const windowSize = useWindowSize();
  const dispatch = useDispatch();
  const { isOpenDropdown, setIsOpenDropdown } = useContext(MainContext);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  return (
    <div className="category-wrapper">
      <OutsideAlerter visible={isOpenDropdown} setVisible={setIsOpenDropdown}>
        <button onClick={() => setIsOpenDropdown((prev) => !prev)}>
          <Apps2FillIcon size={20} />
          {tl("All category")}
        </button>
        <div
          className={`category-content-wrapper ${
            isOpenDropdown ? "visible" : ""
          }`}
        >
          {windowSize?.width > 540 ? <LaptopCategory /> : <MobileCategory />}
        </div>
      </OutsideAlerter>
    </div>
  );
};

export default Category;
