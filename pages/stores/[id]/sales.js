import React, { useContext, useEffect, useState } from "react";
import nookies from "nookies";
import { ProductApi } from "../../../api/main/product";
import ProductCard from "../../../components/products/card";
import HorizontalCard from "../../../components/products/horizontal";
import ProductSection from "../../../components/products/section";
import { MainContext } from "../../../utils/contexts/MainContext";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import axiosService from "../../../services/axios";
import SEO from "../../../components/seo";

const Sales = ({ discountProduct, setLoader }) => {
  const { t: tl } = useTranslation();
  const router = useRouter();
  const { layout, brandList, getBrand } = useContext(MainContext);
  const [discountList, setDiscountList] = useState(discountProduct.data);
  const [page, setPage] = useState(2);
  const [total, setTotal] = useState(discountProduct.meta?.total);

  useEffect(() => {
    setDiscountList(discountProduct.data);
    if (router.query.id && !brandList) getBrand(router.query.id);
  }, [router.query.id, discountProduct.data]);

  const getDiscountProduct = (perPage = 12, page = 1) => {
    ProductApi.getDiscount({ perPage, page, shop_id: router.query.id })
      .then((response) => {
        setTotal(response.meta.total);
        setDiscountList([...discountList, ...response.data]);
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handlePaginate = () => {
    setLoader(true);
    getDiscountProduct(12, page);
    setPage(page + 1);
  };

  return (
    <>
      <SEO />
      <div className="all-products">
        <ProductSection
          icon={true}
          filter={false}
          title="Sales"
          sort={true}
          total={total}
          brandList={brandList}
          isEmpty={discountList?.length}
          isLoading={discountList}
        >
          {discountList?.map((product) =>
            layout === "vertical" ? (
              <ProductCard key={product.uuid} product={product} />
            ) : (
              <HorizontalCard key={product.uuid} product={product} />
            )
          )}
        </ProductSection>
        {total > discountList?.length && (
          <div onClick={() => handlePaginate(page)} className="see-more">
            {tl("Load more")}
          </div>
        )}
      </div>
    </>
  );
};
export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const cookies = nookies.get(ctx);
  const currency_id = cookies?.currency_id;
  const language_id = cookies?.language_id;
  const language_locale = cookies?.language_locale;
  const resProduct = await axiosService.get(`/api/v1/rest/products/discount`, {
    params: {
      perPage: 12,
      page: 1,
      shop_id: query.id,
      brand_id: query?.brand_id,
      category_id: query?.category_id,
      price_to: query?.price_to,
      price_from: query?.price_from,
      sort: query?.sort,
      column_price: query?.column_price,
      currency_id,
      language_id,
      lang: language_locale,
    },
  });

  let discountProduct = resProduct.data;
  return { props: { discountProduct } };
}
export default Sales;
