import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useRouter } from "next/router";
import QueryString from "qs";
import { useDispatch } from "react-redux";
import { fetchFilter } from "../../redux/slices/filter";
import ProductLoader from "../loader/product";
import Empty from "../empty-data";
import { images } from "../../constants/images";
const CustomDrawer = dynamic(() => import("../drawer"));
const SectionSort = dynamic(() => import("./components/section-sort"));
const VerticalFilter = dynamic(() => import("../search-filter/vertical"));
const SectionHeader = dynamic(() => import("./components/section-header"));
const SelectedFilterItem = dynamic(() =>
  import("../search-filter/selectedFilterItem")
);

const ProductSection = ({
  children,
  title = "",
  href = null,
  icon,
  sort = false,
  filter = false,
  total = 0,
  className = "",
  isLoading = true,
  isEmpty = true,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const routeHref = router.route.split("/");
  const [open, setOpen] = useState(null);

  const handleFilter = (params) => {
    const id = router.query.id;
    if (params.sort) params.column_price = "price";
    const str = QueryString.stringify(params);
    dispatch(fetchFilter(params));
    if (router.pathname === "/all-product") {
      router.push(`/${routeHref[routeHref.length - 1]}?${str}`);
    } else if (!id) {
      router.push(`/stores/${routeHref[routeHref.length - 1]}?${str}`);
    } else {
      router.push(`/stores/${id}/${routeHref[routeHref.length - 1]}?${str}`);
    }
  };
  return (
    <div className="product-section">
      <SectionHeader title={title} href={href} icon={icon} />
      <div className={`section-content-wrapper ${className}`}>
        {filter && <VerticalFilter handleFilter={handleFilter} />}
        <div className="container-full">
          {filter && <SelectedFilterItem handleFilter={handleFilter} />}
          <SectionSort sort={sort} total={total} setOpen={setOpen} />
          {!Boolean(isLoading) && (
            <div className="section-content">
              <ProductLoader />
              <ProductLoader />
              <ProductLoader />
              <ProductLoader />
            </div>
          )}
          {!Boolean(isEmpty) && (
            <Empty image={images.ViewedProduct} text1="There are no items." />
          )}
          <div className="section-content">{children}</div>
        </div>
      </div>
      <CustomDrawer header={true} open={open} setOpen={setOpen}>
        <VerticalFilter handleFilter={handleFilter} className="mobile-filter" />
      </CustomDrawer>
    </div>
  );
};

export default ProductSection;
