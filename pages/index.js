import { useEffect, useState } from "react";
import HomeBanner from "../components/banner/home";
import AppBanner from "../components/stores/app-banner";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getBanners } from "../redux/slices/banner";
import SEO from "../components/seo";
import { ProductApi } from "../api/main/product";
import ProductSection from "../components/products/section";
import ProductCard from "../components/products/card";
import CategoryByChild from "../components/category/category-by-child";
import CategoryByParent from "../components/category/category-by-parent";
import BeSeller from "../components/banner/be-seller";
import Blog from "../components/blog";
import CategoryWithProduct from "../components/category-with-product";

function Home() {
  const dispatch = useDispatch();
  const [discountList, setDiscountList] = useState(null);
  const [mostSales, setMostSales] = useState(null);
  const bannerList = useSelector(
    (state) => state.banners.data.data,
    shallowEqual
  );
  const getDiscountProduct = (perPage = 4, page = 1) => {
    ProductApi.getDiscount({ perPage, page })
      .then((response) => {
        setDiscountList(response.data);
      })
      .catch((error) => {
        console.error(error);
        setDiscountList([]);
      });
  };
  const getMostSales = (perPage = 4, page = 1) => {
    ProductApi.getMostSales({ perPage, page })
      .then((response) => {
        setMostSales(response.data);
      })
      .catch((error) => {
        console.error(error);
        setMostSales([]);
      });
  };
  useEffect(() => {
    dispatch(
      getBanners({
        params: { perPage: 8, page: 1, active: 1, type: "banner" },
      })
    );
    Promise.all([getDiscountProduct(), getMostSales()]);
  }, []);

  return (
    <>
      <SEO />
      <HomeBanner bannerList={bannerList} />
      <CategoryByChild />
      <CategoryByParent />
      <ProductSection
        icon={true}
        title="Super discounts of the week"
        href="/stores/discount-product"
        isLoading={discountList}
        isEmpty={discountList?.length}
      >
        {discountList?.map((product) => (
          <ProductCard key={product.uuid} product={product} />
        ))}
      </ProductSection>
      <ProductSection
        title="Most Sales"
        href="/stores/often-buy"
        isLoading={mostSales}
        isEmpty={mostSales?.length}
      >
        {mostSales?.map((product) => (
          <ProductCard key={product.uuid} product={product} />
        ))}
      </ProductSection>
      <CategoryWithProduct />
      <BeSeller />
      <Blog />
      <AppBanner />
    </>
  );
}

export default Home;
