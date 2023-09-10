import React, { useEffect, useState } from "react";
import nookies from "nookies";
import LgBanner from "../../../components/banner/banner-lg";
import SmBanner from "../../../components/banner/banner-sm";
import ProductSection from "../../../components/products/section";
import ProductCard from "../../../components/products/card";
import BrandCard from "../../../components/brands/card";
import CustomDrawer from "../../../components/drawer";
import StoreRate from "../../../components/stores/rate";
import DeliveryTime from "../../../components/stores/delivery-time";
import StoreInfo from "../../../components/stores/store-info";
import { BrandApi } from "../../../api/main/brand";
import axiosService from "../../../services/axios";
import { shallowEqual, useSelector } from "react-redux";
import { ProductApi } from "../../../api/main/product";
import HorizontalCard from "../../../components/products/horizontal";
import SEO from "../../../components/seo";
import LookCard from "../../../components/looks/card";
import { BannerApi } from "../../../api/main/banner";
import LookBanner from "../../../components/banner/look";
import ErrorBoundary from "../../../components/error/error";

const Store = ({ storeDetail, error }) => {
  const [open, setOpen] = useState(null);
  const [content, setContent] = useState(null);
  const [brandList, setBrandList] = useState(null);
  const [lookProduct, setLookProduct] = useState(null);
  const [discountList, setDiscountList] = useState(null);
  const [mostSales, setMostSales] = useState(null);
  const [news, setNews] = useState(null);
  const viewedProduct = useSelector(
    (state) => state.viewedProduct.viewedProductList,
    shallowEqual
  );

  const handleContent = (key) => {
    setContent(key);
    setOpen(true);
  };
  const getBrand = (perPage = 6, page = 1) => {
    BrandApi.get({ perPage, page, shop_id: storeDetail.id })
      .then((response) => {
        setBrandList(response.data);
      })
      .catch((error) => {
        setBrandList([]);
        console.error(error);
      });
  };
  const getBanner = (perPage = 4, page = 1) => {
    BannerApi.get({ perPage, page, shop_id: storeDetail.id, type: "look" })
      .then((response) => {
        setLookProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getDiscountProduct = (perPage = 4, page = 1) => {
    ProductApi.getDiscount({ perPage, page, shop_id: storeDetail.id })
      .then((response) => {
        setDiscountList(response.data);
      })
      .catch((error) => {
        setDiscountList([]);
        console.error(error);
      });
  };
  const getMostSales = (perPage = 4, page = 1) => {
    ProductApi.getMostSales({ perPage, page, shop_id: storeDetail.id })
      .then((response) => {
        setMostSales(response.data);
      })
      .catch((error) => {
        setMostSales([]);
        console.error(error);
      });
  };
  const getNews = (perPage = 3, page = 1) => {
    ProductApi.get({
      perPage,
      page,
      shop_id: storeDetail.id,
      sort: "desc",
      column: "created_at",
    })
      .then((response) => {
        setNews(response.data);
      })
      .catch((error) => {
        setNews([]);
        console.error(error);
      });
  };
  useEffect(() => {
    Promise.all([
      getBrand(),
      getDiscountProduct(),
      getMostSales(),
      getNews(),
      getBanner(),
    ]);
  }, []);

  return (
    <>
      <SEO
        title={storeDetail?.translation?.title}
        description={storeDetail?.translation?.description}
        keywords={storeDetail?.translation?.description}
        image={process.env.IMG_URL + "/public/images/" + storeDetail?.logo_img}
      />
      <ErrorBoundary error={error}>
        <div className="store">
          <LgBanner handleContent={handleContent} data={storeDetail} />
          <SmBanner />
          <ProductSection
            title="New products"
            href={`/stores/${storeDetail.id}/news`}
            isLoading={news}
            isEmpty={news?.length}
          >
            {news?.map((product) => (
              <HorizontalCard key={product.uuid} product={product} />
            ))}
          </ProductSection>
          <ProductSection
            title="Top sales"
            href={`/stores/${storeDetail.id}/top-sales`}
            isLoading={mostSales}
            isEmpty={mostSales?.length}
          >
            {mostSales?.slice(0, 8).map((product) => (
              <ProductCard key={product.uuid} product={product} />
            ))}
          </ProductSection>
          <ProductSection
            icon={true}
            title="Discount"
            href={`/stores/${storeDetail.id}/sales`}
            isLoading={discountList}
            isEmpty={discountList?.length}
          >
            {discountList?.map((product) => (
              <ProductCard key={product.uuid} product={product} />
            ))}
          </ProductSection>
          <ProductSection
            title="Lookbooks"
            href={`/stores/${storeDetail.id}/look-product`}
            className="look-product-section"
            isLoading={lookProduct}
            isEmpty={lookProduct?.length}
          >
            <LookBanner />
            {lookProduct?.map((product) => (
              <LookCard key={product.uuid} product={product} />
            ))}
          </ProductSection>
          {Boolean(viewedProduct.length > 0) && (
            <ProductSection
              title="Viewed products"
              href="/stores/viewed-product"
            >
              {viewedProduct?.slice(0, 4).map((product) => (
                <ProductCard key={product.uuid} product={product} />
              ))}
            </ProductSection>
          )}
          <ProductSection
            icon={false}
            title="Brands"
            href="/stores/all-brand"
            isLoading={brandList}
            isEmpty={brandList?.length}
          >
            {brandList?.map((brand, key) => {
              return <BrandCard key={key} brand={brand} />;
            })}
          </ProductSection>
          <CustomDrawer title="Rating store" open={open} setOpen={setOpen}>
            {content === "store-rate" && <StoreRate />}
            {content === "delivery-time" && (
              <DeliveryTime storeDetail={storeDetail} />
            )}
            {content === "store-info" && <StoreInfo />}
          </CustomDrawer>
        </div>
      </ErrorBoundary>
    </>
  );
};
export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const cookies = nookies.get(ctx);
  const currency_id = cookies?.currency_id;
  const language_id = cookies?.language_id;
  const language_locale = cookies?.language_locale;
  const params = {
    perPage: 0,
    page: 1,
    currency_id,
    language_id,
    lang: language_locale,
  };
  try {
    const resStore = await axiosService.get(`/api/v1/rest/shops/${query.id}`, {
      params,
    });
    let storeDetail = resStore.data.data;
    return { props: { storeDetail, error: null } };
  } catch (error) {
    return { props: { storeDetail: null, error: error.response.data } };
  }
}
export default Store;
