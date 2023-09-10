import React, { useCallback, useEffect, useRef, useState } from "react";
import nookies, { parseCookies } from "nookies";
import Empty from "../../components/empty-data";
import ProductCard from "../../components/products/card";
import ProductSection from "../../components/products/section";
import axiosService from "../../services/axios";
import { images } from "../../constants/images";
import SEO from "../../components/seo";
import { ProductApi } from "../../api/main/product";
import ProductLoader from "../../components/loader/product";
import ErrorBoundary from "../../components/error/error";

const OftenBuy = ({ discountProduct, error }) => {
  const [discountList, setDiscountList] = useState(discountProduct.data);
  const [meta, setMeta] = useState(discountProduct?.meta);
  const [loader, setLoader] = useState(false);
  const observer = useRef();
  const { current_page, last_page, total } = meta || {};
  const { user_address_id } = parseCookies() || {};

  const getDiscountProduct = (perPage = 12, page = 1) => {
    setLoader(true);
    ProductApi.getMostSales({ perPage, page, user_address_id })
      .then((response) => {
        setDiscountList([...discountList, ...response.data]);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    if (current_page >= 2) getDiscountProduct(12, current_page);
  }, [current_page]);

  const hasMore = Boolean(last_page > current_page);

  const lastBookElementRef = useCallback(
    (node) => {
      if (loader) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setMeta((prev) => ({
            ...prev,
            current_page: prev.current_page + 1,
          }));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loader, hasMore]
  );

  return (
    <>
      <SEO />
      <ErrorBoundary error={error}>
        <div className="discount-product">
          <ProductSection
            title="Often buy products"
            isLoading={discountList}
            isEmpty={discountList?.length}
          >
            {discountList?.map((product) => (
              <ProductCard key={product.uuid} product={product} />
            ))}
            {loader && <ProductLoader />}
            <div ref={lastBookElementRef} />
          </ProductSection>
        </div>
      </ErrorBoundary>
    </>
  );
};
export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const { user_address_id, currency_id, language_locale } = cookies || {};
  const params = {
    perPage: 12,
    currency_id,
    lang: language_locale,
    user_address_id,
  };

  return axiosService
    .get(`/api/v1/rest/products/most-sold`, { params })
    .then((res) => ({
      props: { discountProduct: res.data, error: null },
    }))
    .catch((error) => ({
      props: { discountProduct: {}, error: error.response?.data || true },
    }));
}
export default OftenBuy;
