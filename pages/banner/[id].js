import React, { useContext, useEffect, useState } from "react";
import nookies from "nookies";
import ProductCard from "../../components/products/card";
import ProductSection from "../../components/products/section";
import axiosService from "../../services/axios";
import BannerDetail from "../../components/banner/detail";
import { MainContext } from "../../utils/contexts/MainContext";
import HorizontalCard from "../../components/products/horizontal";
import SEO from "../../components/seo";
import ErrorBoundary from "../../components/error/error";
const Seller = ({ bannerDetail, error }) => {
  const [productList, setProductList] = useState(null);
  const { layout } = useContext(MainContext);

  const getProduct = () => {
    axiosService
      .get(`/api/v1/rest/banners/${bannerDetail.id}/products`)
      .then((response) => {
        setProductList(response.data.data);
      })
      .catch((error) => {
        setProductList([]);
        console.error(error);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <SEO />
      <ErrorBoundary error={error}>
        <div className="seller">
          <BannerDetail img={bannerDetail.img} />
          <ProductSection
            filter={false}
            title="Banner detail"
            sort={productList?.length > 0 ? true : false}
            total={productList?.length}
            isEmpty={productList?.length}
            isLoading={productList}
          >
            {productList?.map((product) =>
              layout === "vertical" ? (
                <ProductCard key={product.uuid} product={product} />
              ) : (
                <HorizontalCard key={product.uuid} product={product} />
              )
            )}
          </ProductSection>
        </div>
      </ErrorBoundary>
    </>
  );
};
export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const language_id = cookies?.language_id;
  const language_locale = cookies?.language_locale;
  const { query } = ctx;
  const params = {
    perPage: 3,
    page: 1,
    shop_id: query.id,
    brand_id: query?.brand_id,
    category_id: query?.category_id,
    price_to: query?.price_to,
    price_from: query?.price_from,
    sort: query?.sort,
    column_price: query?.column_price,
    language_id,
    lang: language_locale,
  };
  try {
    const resStore = await axiosService.get(
      `/api/v1/rest/banners/${query.id}`,
      { params }
    );
    let bannerDetail = resStore.data.data;
    return { props: { bannerDetail, error: null } };
  } catch (error) {
    return { props: { bannerDetail: {}, error: error.response.data } };
  }
}
export default Seller;
