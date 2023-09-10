import React, { useContext, useEffect, useState } from "react";
import nookies from "nookies";
import ProductCard from "../../../components/products/card";
import HorizontalCard from "../../../components/products/horizontal";
import ProductSection from "../../../components/products/section";
import { MainContext } from "../../../utils/contexts/MainContext";
import { useTranslation } from "react-i18next";
import axiosService from "../../../services/axios";
import { useRouter } from "next/router";
import { ProductApi } from "../../../api/main/product";
import SEO from "../../../components/seo";

const TopSales = ({ mostSold, setLoader }) => {
  const { t: tl } = useTranslation();
  const router = useRouter();
  const { layout, brandList, getBrand } = useContext(MainContext);
  const [salesList, setSalesList] = useState(mostSold.data);
  const [page, setPage] = useState(2);
  const [total, setTotal] = useState(mostSold.meta?.total);

  useEffect(() => {
    setSalesList(mostSold.data);
    if (router.query.id && !brandList) getBrand(router.query.id);
  }, [router.query.id, mostSold.data]);

  const getSalesProduct = (perPage = 12, page = 1) => {
    ProductApi.getMostSales({ perPage, page, shop_id: router.query.id })
      .then((response) => {
        setTotal(response.meta.total);
        setSalesList([...salesList, ...response.data]);
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handlePaginate = () => {
    setLoader(true);
    getSalesProduct(12, page);
    setPage(page + 1);
  };

  return (
    <>
      <SEO />
      <div className="all-products">
        <ProductSection
          brandList={brandList}
          filter={false}
          title="Top sales"
          sort={true}
          total={total}
          isLoading={salesList}
          isEmpty={salesList?.length}
        >
          {salesList?.map((product) =>
            layout === "vertical" ? (
              <ProductCard key={product.uuid} product={product} />
            ) : (
              <HorizontalCard key={product.uuid} product={product} />
            )
          )}
        </ProductSection>
        {total > salesList?.length && (
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
  const resProduct = await axiosService.get(`/api/v1/rest/products/most-sold`, {
    params: {
      perPage: 12,
      page: 1,
      shop_id: query?.id,
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

  let mostSold = resProduct.data;
  return { props: { mostSold } };
}
export default TopSales;
