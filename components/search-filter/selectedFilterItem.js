import { GetColorName } from "hex-color-to-color-name";
import { t } from "i18next";
import { useRouter } from "next/router";
import QueryString from "qs";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseCircleLineIcon from "remixicon-react/CloseCircleLineIcon";
import { fetchFilter } from "../../redux/slices/filter";

const SelectedFilterItem = ({ handleFilter }) => {
  const { query } = useRouter();
  const router = useRouter();
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.filter);
  const selectedItems = useMemo(
    () => QueryString.parse(query),
    [QueryString.parse(query)]
  );

  const CategoryItem = () => {
    const removeItem = (id) => {
      const index = selectedItems.categoryIds?.findIndex(
        (item) => parseInt(item) === id
      );
      if (index >= 0) {
        const newIds = selectedItems.categoryIds.filter(
          (item) => parseInt(item) !== id
        );
        selectedItems.categoryIds = newIds;
        handleFilter({ ...selectedItems });
      }
    };
    if (selectedItems?.categoryIds) {
      return selectedItems?.categoryIds.map((item) => {
        const currentItem = filters.categories?.find(
          (element) => element.id === parseInt(item)
        );

        if (currentItem)
          return (
            <li>
              <span>{currentItem?.translation?.title}</span>
              <CloseCircleLineIcon
                size={16}
                onClick={() => removeItem(currentItem?.id)}
              />
            </li>
          );
        else return;
      });
    } else return "";
  };
  const BrandItem = () => {
    const removeItem = (id) => {
      const index = selectedItems.brandIds?.findIndex(
        (item) => parseInt(item) === id
      );
      if (index >= 0) {
        const newIds = selectedItems.brandIds.filter(
          (item) => parseInt(item) !== id
        );
        selectedItems.brandIds = newIds;
        handleFilter({ ...selectedItems });
      }
    };
    if (selectedItems?.brandIds) {
      return selectedItems?.brandIds.map((item) => {
        const currentItem = filters.brands?.find(
          (element) => element.id === parseInt(item)
        );
        if (currentItem)
          return (
            <li>
              <span>{currentItem?.title}</span>
              <CloseCircleLineIcon
                size={16}
                onClick={() => removeItem(currentItem?.id)}
              />
            </li>
          );
      });
    } else return "";
  };
  const ExtrasItem = () => {
    const removeItem = (id) => {
      const index = selectedItems.extrasIds?.findIndex(
        (item) => parseInt(item) === id
      );
      if (index >= 0) {
        const newIds = selectedItems.extrasIds.filter(
          (item) => parseInt(item) !== id
        );
        selectedItems.extrasIds = newIds;
        handleFilter({ ...selectedItems });
      }
    };
    if (selectedItems?.extrasIds) {
      const newExtraArray = [];
      const keys = Object.keys(filters.extraValues || {});
      keys.forEach((key) => {
        newExtraArray.push(...filters.extraValues[key]);
      });
      return selectedItems?.extrasIds.map((item) => {
        const currentItem = newExtraArray.find(
          (element) => element.id == parseInt(item)
        );

        if (currentItem)
          return (
            <li>
              {Boolean(currentItem?.value?.includes("#")) ? (
                <>
                  <div
                    className="color-tag"
                    style={{ background: currentItem?.value }}
                  />
                  <span>{GetColorName(currentItem?.value)}</span>
                </>
              ) : (
                <span>{currentItem?.value}</span>
              )}
              <CloseCircleLineIcon
                size={16}
                onClick={() => removeItem(currentItem.id)}
              />
            </li>
          );
      });
    } else return "";
  };
  const ShopItem = () => {
    const removeItem = (id) => {
      const index = selectedItems.shopIds?.findIndex(
        (item) => parseInt(item) === id
      );
      if (index >= 0) {
        const newIds = selectedItems.shopIds.filter(
          (item) => parseInt(item) !== id
        );
        selectedItems.shopIds = newIds;
        handleFilter({ ...selectedItems });
      }
    };
    if (selectedItems?.shopIds) {
      return selectedItems?.shopIds.map((item) => {
        const currentItem = filters.shops?.find(
          (element) => element.id === parseInt(item)
        );
        return (
          <li>
            <span>{currentItem?.translation?.title}</span>
            <CloseCircleLineIcon
              size={16}
              onClick={() => removeItem(currentItem.id)}
            />
          </li>
        );
      });
    } else return "";
  };
  const PriceItem = () => {
    const removeItem = () => {
      delete selectedItems.range;
      handleFilter({ ...selectedItems });
    };
    if (selectedItems?.range) {
      return (
        <li>
          <span>{`from=${selectedItems?.range[0]} to=${selectedItems?.range[1]}`}</span>
          <CloseCircleLineIcon size={16} onClick={removeItem} />
        </li>
      );
    } else return "";
  };
  const CLear = () => {
    dispatch(
      fetchFilter({ parent_category_id: router.query.parent_category_id })
    );
    router.push(
      `/all-product?parent_category_id=${router.query.parent_category_id}`
    );
  };
  return (
    <div className="selected-filter-item">
      <ul>
        <CategoryItem />
        <BrandItem />
        <ExtrasItem />
        <ShopItem />
        <PriceItem />
        {Object.keys(selectedItems).length > 1 && (
          <li className="clear" onClick={CLear}>
            <span>{t("Clear")}</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SelectedFilterItem;
